<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// reactive state
let clotheSize = ref([]);
localStorage.removeItem('name');
let token = localStorage.getItem('token');
let clothesize_id = localStorage.getItem('id');
let wadrobeName = localStorage.getItem('name');
let isEditing = ref(false);
let currentWadrobesizeId = ref(null);
let sizeName = ref('');
// Mounted lifecycle hook
onMounted(async () => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  await fetchWadrobesCategories();
});

// Function to fetch all clotheSize
const fetchWadrobesCategories = async () => {
  try {
    // Set the Authorization header with the token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const response = await axios.get('/sizes', {
      params: { clothesize_id : clothesize_id }
    });

    clotheSize.value = response.data.data;
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
};

// Function to handle form submission for adding/updating a categories of wardrobe
const handleSubmit = async () => {
  if (isEditing.value) {
    try {
      await axios.put(`/sizes/${currentWadrobesizeId.value}`, { description: sizeName.value,  clothesize_id: clothesize_id  });
      await fetchWadrobesCategories();
      resetForm();
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  } else {
    try {
      await axios.post('/sizes', { description: sizeName.value, clothesize_id: clothesize_id });
      await fetchWadrobesCategories(); // Refresh the list after adding
      resetForm();
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  }
};

// Function to set form for editing a wadrobe
const editClotheSize = (clotheSize) => {
  sizeName.value = clotheSize.name;
  isEditing.value = true;
  currentWadrobesizeId.value = clotheSize.id;
};

// Function to remove a wadrobe
const removeClotheSize = async (clothesize_id) => {
  try {
    await axios.delete(`/sizes/${clothesize_id}`);
    await fetchWadrobesCategories(); // Refresh the list after deletion
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
};

// Function to reset form fields
const resetForm = () => {
  sizeName.value = '';
  isEditing.value = false;
  currentWadrobesizeId.value = null;
};


const router = useRouter();
const goToClothing = (sizeId, sizeName) => {
  localStorage.setItem('size_id', sizeId);
  localStorage.setItem('size_name', sizeName);

  router.push({ path: '/sizes' });
};
</script>
<template>
  <h1>{{ wadrobeName }}</h1>
  <main class="container flex items-center h-screen mx-auto">
    <div class="flex flex-col">
      <form @submit.prevent="handleSubmit" class="mb-4">
        <input
            type="text"
            v-model="sizeName"
            placeholder="Clothe Size Name"
            required
            class="border rounded px-2 py-1"
        />
        <button type="submit" class="ml-2 bg-blue-500 text-white rounded px-4 py-1">
          {{ isEditing ? 'Update Existing Clothe Size' : 'Add New Clothe Size' }}
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
              <tr v-for="clotheSize in clotheSizes" :key="clotheSize.id"  @click="goToClothing(clotheSize.id, clotheSize.name )" >
                <td
                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap"
                >
                  {{ clotheSize.id }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {{ clotheSize.name }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {{ clotheSize.created_at }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap flex justify-center">
                  <button @click.stop="editClotheSize(clotheSize)" class="bg-yellow-500 text-white rounded px-2 py-1 mr-2">Edit</button>
                  <button @click.stop="removeClotheSize(clotheSize.id)" class="bg-red-500 text-white rounded px-2 py-1">Remove</button>
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