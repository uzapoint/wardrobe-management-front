<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// reactive state
let clotheColor = ref([]);
localStorage.removeItem('name');
let token = localStorage.getItem('token');
let clothecolor_id = localStorage.getItem('id');
let wadrobeName = localStorage.getItem('name');
let isEditing = ref(false);
let currentWadrobecolorId = ref(null);
let colorName = ref('');
// Mounted lifecycle hook
onMounted(async () => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  await fetchColors();
});

// Function to fetch all clotheColor
const fetchColors = async () => {
  try {
    // Set the Authorization header with the token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const response = await axios.get('/colors', {
      params: { clothecolor_id : clothecolor_id }
    });

    clotheColor.value = response.data.data;
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
};

// Function to handle form submission for adding/updating a categories of wardrobe
const handleSubmit = async () => {
  if (isEditing.value) {
    try {
      await axios.put(`/colors/${currentWadrobecolorId.value}`, { description: colorName.value,  clothecolor_id: clothecolor_id  });
      await fetchColors();
      resetForm();
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  } else {
    try {
      await axios.post('/colors', { description: colorName.value, clothecolor_id: clothecolor_id });
      await fetchColors(); // Refresh the list after adding
      resetForm();
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  }
};

// Function to set form for editing a wadrobe
const editClotheColor = (clotheColor) => {
  colorName.value = clotheColor.name;
  isEditing.value = true;
  currentWadrobecolorId.value = clotheColor.id;
};

// Function to remove a wadrobe
const removeClotheColor = async (clothecolor_id) => {
  try {
    await axios.delete(`/colors/${clothecolor_id}`);
    await fetchColors(); // Refresh the list after deletion
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
};

// Function to reset form fields
const resetForm = () => {
  colorName.value = '';
  isEditing.value = false;
  currentWadrobecolorId.value = null;
};


const router = useRouter();
const goToClothing = (colorId, colorName) => {
  localStorage.setItem('color_id', colorId);
  localStorage.setItem('color_name', colorName);

  router.push({ path: '/colors' });
};
</script>
<template>
  <h1>{{ wadrobeName }}</h1>
  <main class="container flex items-center h-screen mx-auto">
    <div class="flex flex-col">
      <form @submit.prevent="handleSubmit" class="mb-4">
        <input
            type="text"
            v-model="colorName"
            placeholder="Clothe Color Name"
            required
            class="border rounded px-2 py-1"
        />
        <button type="submit" class="ml-2 bg-blue-500 text-white rounded px-4 py-1">
          {{ isEditing ? 'Update Existing Clothe Color' : 'Add New Clothe Color' }}
        </button>
      </form>
      <div class="overflow-x-auto">
        <div class="p-1.5 w-full inline-block align-middle">
          <div class="overflow-hidden border rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
              <tr>
                <th
                    scope="col"
                    class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                >
                  ID
                </th>
                <th
                    scope="col"
                    class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                >
                  Name
                </th>
                <th
                    scope="col"
                    class="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase"
                >
                  Created At
                </th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
              <tr v-for="clotheColor in clotheColors" :key="clotheColor.id"  @click="goToClothing(clotheColor.id, clotheColor.name )" >
                <td
                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap"
                >
                  {{ clotheColor.id }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {{ clotheColor.name }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {{ clotheColor.created_at }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap flex justify-center">
                  <button @click.stop="editClotheColor(clotheColor)" class="bg-yellow-500 text-white rounded px-2 py-1 mr-2">Edit</button>
                  <button @click.stop="removeClotheColor(clotheColor.id)" class="bg-red-500 text-white rounded px-2 py-1">Remove</button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>