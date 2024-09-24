<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// Reactive state
let clothes = ref([]);
let token = localStorage.getItem('token');
let isEditing = ref(false);
let currentClotheId = ref(null);
let clotheName = ref('');
let clotheCategory = ref('');
let clotheSize = ref('');
let clotheColors = ref([]);
let clotheImages = ref([]);

// Mounted lifecycle hook
onMounted(async () => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  await fetchWadrobesCategories();
});

// Function to fetch all clothing items
const fetchWadrobesCategories = async () => {
  try {
    const response = await axios.get('/clothing-items');
    clothes.value = response.data.data;
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
};

// Function to handle form submission for adding/updating a clothing item
const handleSubmit = async () => {
  const payload = {
    description: clotheName.value,
    category: clotheCategory.value,
    size: clotheSize.value,
    colors: clotheColors.value,
    images: clotheImages.value,
  };

  if (isEditing.value) {
    try {
      await axios.put(`/clothing-items/${currentClotheId.value}`, payload);
      await fetchWadrobesCategories();
      resetForm();
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  } else {
    try {
      await axios.post('/clothing-items', payload);
      await fetchWadrobesCategories();
      resetForm();
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  }
};

// Function to set form for editing a clothe
const editWadrobe = (clothe) => {
  clotheName.value = clothe.description;
  clotheCategory.value = clothe.category; // Assuming clothe has a category field
  clotheSize.value = clothe.size; // Assuming clothe has a size field
  clotheColors.value = clothe.colors; // Assuming clothe has an array of colors
  clotheImages.value = clothe.images; // Assuming clothe has an array of images
  isEditing.value = true;
  currentClotheId.value = clothe.id;
};

// Function to remove a clothe
const removeWadrobe = async (clothingItem_id) => {
  try {
    await axios.delete(`/clothing-items/${clothingItem_id}`);
    await fetchWadrobesCategories();
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
};

// Function to reset form fields
const resetForm = () => {
  clotheName.value = '';
  clotheCategory.value = '';
  clotheSize.value = '';
  clotheColors.value = [];
  clotheImages.value = [];
  isEditing.value = false;
  currentClotheId.value = null;
};

const router = useRouter();
const goToClothing = (clotheId, clotheName) => {
  localStorage.setItem('clothe_id', clotheId);
  localStorage.setItem('clothe_name', clotheName);
  router.push({ path: '/clothing-items' });
};
</script>

<template>
  <h1>{{ clotheName }}</h1>
  <main class="container flex items-center h-screen mx-auto">
    <div class="flex flex-col">
      <form @submit.prevent="handleSubmit" class="mb-4">
        <input
            type="text"
            v-model="clotheName"
            placeholder="Clothing Item Name"
            required
            class="border rounded px-2 py-1"
        />
        <input
            type="text"
            v-model="clotheCategory"
            placeholder="Category"
            required
            class="border rounded px-2 py-1 mt-2"
        />
        <input
            type="text"
            v-model="clotheSize"
            placeholder="Size"
            required
            class="border rounded px-2 py-1 mt-2"
        />
        <textarea
            v-model="clotheColors"
            placeholder="Colors (comma-separated)"
            required
            class="border rounded px-2 py-1 mt-2"
        ></textarea>
        <textarea
            v-model="clotheImages"
            placeholder="Images (comma-separated URLs)"
            required
            class="border rounded px-2 py-1 mt-2"
        ></textarea>
        <button type="submit" class="ml-2 bg-blue-500 text-white rounded px-4 py-1 mt-2">
          {{ isEditing ? 'Update Existing Clothing Item' : 'Add New Clothing Item' }}
        </button>
      </form>
      <div class="overflow-x-auto">
        <div class="p-1.5 w-full inline-block align-middle">
          <div class="overflow-hidden border rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">ID</th>
                <th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Name</th>
                <th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Category</th>
                <th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Size</th>
                <th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Colors</th>
                <th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Created At</th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
              <tr v-for="clothe in clothes" :key="clothe.id" @click="goToClothing(clothe.id, clothe.description)">
                <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">{{ clothe.id }}</td>
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{{ clothe.description }}</td>
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{{ clothe.category }}</td>
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{{ clothe.size }}</td>
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{{ clothe.colors.join(', ') }}</td>
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{{ clothe.created_at }}</td>
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap flex justify-center">
                  <button @click.stop="editWadrobe(clothe)" class="bg-yellow-500 text-white rounded px-2 py-1 mr-2">Edit</button>
                  <button @click.stop="removeWadrobe(clothe.id)" class="bg-red-500 text-white rounded px-2 py-1">Remove</button>
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
