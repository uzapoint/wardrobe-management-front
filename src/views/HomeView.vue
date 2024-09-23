<template>
  <h1>Your Wadrobes</h1>
  <main class="container flex h-screen mx-auto w-full">
    <div class="flex flex-col">
      <!-- Form to Add/Edit Wadrobes -->
      <form @submit.prevent="handleSubmit" class="mb-4">
        <input
          type="text"
          v-model="wadrobeName"
          placeholder="Wadrobe Name"
          required
          class="border rounded px-2 py-1"
        />
        <button type="submit" class="ml-2 bg-blue-500 text-white rounded px-4 py-1">
          {{ isEditing ? 'Update Wadrobe' : 'Add Wadrobe' }}
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
                  <th scope="col" class="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase">Created At</th>
                  <th scope="col" class="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="wadrobe in wadrobes" :key="wadrobe.id" @click="goToCategory(wadrobe.id, wadrobe.description)">
                  <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">{{ wadrobe.id }}</td>
                  <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{{ wadrobe.description }}</td>
                  <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{{ wadrobe.created_at }}</td>
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

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// Reactive state
let wadrobes = ref([]);
let user_id = localStorage.getItem('user_id');
let token = localStorage.getItem('token'); // Assuming you store the token in localStorage
let wadrobeName = ref('');
let isEditing = ref(false);
let currentWadrobeId = ref(null);

// Mounted lifecycle hook
onMounted(async () => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  await fetchWadrobes();
});

// Function to fetch all wadrobes
const fetchWadrobes = async () => {
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get('/wadrobes', {
      params: { user_id: user_id }
    });
    wadrobes.value = response.data.data;
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
};

// Function to handle form submission for adding/updating a wadrobe
const handleSubmit = async () => {
  if (isEditing.value) {
    // Update existing wadrobe
    try {
      await axios.put(`/wadrobes/${currentWadrobeId.value}`, { description: wadrobeName.value,  user_id: user_id  });
      await fetchWadrobes(); // Refresh the list after update
      resetForm();
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  } else {
    // Add new wadrobe
    try {
      await axios.post('/wadrobes', { description: wadrobeName.value, user_id: user_id });
      await fetchWadrobes(); // Refresh the list after adding
      resetForm();
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  }
};

// Function to set form for editing a wadrobe
const editWadrobe = (wadrobe) => {
  wadrobeName.value = wadrobe.description;
  isEditing.value = true;
  currentWadrobeId.value = wadrobe.id;
};

// Function to remove a wadrobe
const removeWadrobe = async (wadrobeId) => {
  try {
    await axios.delete(`/wadrobes/${wadrobeId}`);
    await fetchWadrobes(); // Refresh the list after deletion
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
};

// Function to reset form fields
const resetForm = () => {
  wadrobeName.value = '';
  isEditing.value = false;
  currentWadrobeId.value = null;
};

const router = useRouter();

// Function to handle row click and redirect to category page
const goToCategory = (wadrobeId, wadrobename) => {
  localStorage.setItem('wadrobe_id', wadrobeId);
  localStorage.setItem('wadrobe_name', wadrobename);
  
  router.push({ path: '/categories' });
};

</script>

<style scoped>
/* Add your styles here */
</style>