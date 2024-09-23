<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// reactive state
let wadrobes = ref([]);
localStorage.removeItem('categoryName');
let token = localStorage.getItem('token'); // Assuming you store the token in localStorage
let wadrobe_id = localStorage.getItem('wadrobe_id');
let wadrobeName = localStorage.getItem('wadrobe_name');
let isEditing = ref(false);
let currentWadrobeCategoryId = ref(null);
let wadrobeCategoryName = ref('');
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

    // Get API from Laravel backend
    const response = await axios.get('/wadrobe_categories', {
      params: { wadrobe_id : wadrobe_id } // Send user_id as a query parameter
    });

    // Assign state with response data
    wadrobes.value = response.data.data;
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
};

// Function to handle form submission for adding/updating a wadrobecategories
const handleSubmit = async () => {
  if (isEditing.value) {
    // Update existing wadrobe
    try {
      await axios.put(`/wadrobe_categories/${currentWadrobeCategoryId.value}`, { description: wadrobeCategoryName.value,  wadrobe_id: wadrobe_id  });
      await fetchWadrobesCategories(); // Refresh the list after update
      resetForm();
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  } else {
    // Add new wadrobe
    try {
      await axios.post('/wadrobe_categories', { description: wadrobeCategoryName.value, wadrobe_id: wadrobe_id });
      await fetchWadrobesCategories(); // Refresh the list after adding
      resetForm();
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  }
};

// Function to set form for editing a wadrobe
const editWadrobe = (wadrobe) => {
    wadrobeCategoryName.value = wadrobe.description;
  isEditing.value = true;
  currentWadrobeCategoryId.value = wadrobe.id;
};

// Function to remove a wadrobe
const removeWadrobe = async (wadrobeId) => {
  try {
    await axios.delete(`/wadrobe_categories/${wadrobeId}`);
    await fetchWadrobesCategories(); // Refresh the list after deletion
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
};

// Function to reset form fields
const resetForm = () => {
    wadrobeCategoryName.value = '';
  isEditing.value = false;
  currentWadrobeCategoryId.value = null;
};


const router = useRouter();

// Function to handle row click and redirect to category page
const goToClothing = (categoryId, categoryName) => {
  // Set the wadrobe_id in local storage
  localStorage.setItem('category_id', categoryId);
  localStorage.setItem('categoryName', categoryName);
  
  // Redirect to /category page
  router.push({ path: '/clothing' });
};
</script>
<template>
    <h1>{{ wadrobeName }}</h1>  
  <main class="container flex items-center h-screen mx-auto">
    <div class="flex flex-col">
         <!-- Form to Add/Edit Wadrobes -->
      <form @submit.prevent="handleSubmit" class="mb-4">
        <input
          type="text"
          v-model="wadrobeCategoryName"
          placeholder="Wadrobe Categor Name"
          required
          class="border rounded px-2 py-1"
        />
        <button type="submit" class="ml-2 bg-blue-500 text-white rounded px-4 py-1">
          {{ isEditing ? 'Update Wadrobe Category' : 'Add Wadrobe Category' }}
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