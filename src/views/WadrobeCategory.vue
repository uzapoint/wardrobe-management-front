<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// reactive state
let wadrobes = ref([]);
localStorage.removeItem('categoryName');
let token = localStorage.getItem('token'); // Assuming you store the token in localStorage
let wadrobe_id = localStorage.getItem('wadrobe_id');
let wadrobename = localStorage.getItem('wadrobe_name');
// Mounted lifecycle hook
onMounted(async () => {
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
});

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
    <h1>{{ wadrobename }}</h1>  
  <main class="container flex items-center h-screen mx-auto">
    <div class="flex flex-col">
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
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>