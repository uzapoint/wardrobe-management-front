<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// reactive state
let wadrobes = ref([]);
localStorage.removeItem('name');
let token = localStorage.getItem('token');
let wadrobe_id = localStorage.getItem('id');
let wadrobeName = localStorage.getItem('name');
let isEditing = ref(false);
let currentWadrobeCategoryId = ref(null);
let categoryName = ref('');
// Mounted lifecycle hook
onMounted(async () => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  await fetchWadrobesCategories();
});

// Function to fetch all wadrobes
const fetchWadrobesCategories = async () => {
  try {
    // Set the Authorization header with the token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const response = await axios.get('/categories', {
      params: { wadrobe_id : wadrobe_id }
    });

    wadrobes.value = response.data.data;
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
};

// Function to handle form submission for adding/updating a categories of wardrobe
const handleSubmit = async () => {
  if (isEditing.value) {
    try {
      await axios.put(`/categories/${currentWadrobeCategoryId.value}`, { description: categoryName.value,  wadrobe_id: wadrobe_id  });
      await fetchWadrobesCategories();
      resetForm();
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  } else {
    try {
      await axios.post('/categories', { description: categoryName.value, wadrobe_id: wadrobe_id });
      await fetchWadrobesCategories(); // Refresh the list after adding
      resetForm();
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  }
};

// Function to set form for editing a wadrobe
const editWadrobe = (wadrobe) => {
  categoryName.value = wadrobe.description;
  isEditing.value = true;
  currentWadrobeCategoryId.value = wadrobe.id;
};

// Function to remove a wadrobe
const removeWadrobe = async (wadrobeId) => {
  try {
    await axios.delete(`/categories/${wadrobeId}`);
    await fetchWadrobesCategories(); // Refresh the list after deletion
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
};

// Function to reset form fields
const resetForm = () => {
  categoryName.value = '';
  isEditing.value = false;
  currentWadrobeCategoryId.value = null;
};


const router = useRouter();
const goToClothing = (categoryId, categoryName) => {
  localStorage.setItem('category_id', categoryId);
  localStorage.setItem('category_name', categoryName);

  router.push({ path: '/categories' });
};
</script>
<template>
  <h1>{{ wadrobeName }}</h1>
  <main class="container flex items-center h-screen mx-auto">
    <div class="flex flex-col">
      <form @submit.prevent="handleSubmit" class="mb-4">
        <input
            type="text"
            v-model="categoryName"
            placeholder="Category Name"
            required
            class="border rounded px-2 py-1"
        />
        <button type="submit" class="ml-2 bg-blue-500 text-white rounded px-4 py-1">
          {{ isEditing ? 'Update Existing Category' : 'Add New Category' }}
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
              <tr v-for="wadrobe in wadrobes" :key="wadrobe.id"  @click="goToClothing(wadrobe.id, wadrobe.description )" >
                <td
                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap"
                >
                  {{ wadrobe.id }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {{ wadrobe.description }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {{ wadrobe.created_at }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap flex justify-center">
                  <button @click.stop="editWadrobe(wadrobe)" class="bg-yellow-500 text-white rounded px-2 py-1 mr-2">Edit</button>
                  <button @click.stop="removeWadrobe(wadrobe.id)" class="bg-red-500 text-white rounded px-2 py-1">Remove</button>
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