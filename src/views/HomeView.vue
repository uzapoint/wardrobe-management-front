<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// reactive state
let wadrobes = ref([]);
localStorage.removeItem('wadrobe_name');
let user_id = localStorage.getItem('user_id');
let token = localStorage.getItem('token'); // Assuming you store the token in localStorage

// Mounted lifecycle hook
onMounted(async () => {
  try {
    // Set the Authorization header with the token
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

    // Get API from Laravel backend
    const response = await axios.get('/wadrobes', {
      params: { user_id : user_id } // Send user_id as a query parameter
    });

    console.log(token)

    // Assign state with response data
    wadrobes.value = response.data.data;
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
});

const router = useRouter();

// Function to handle row click and redirect to category page
const goToCategory = (wadrobeId, wadrobename) => {
  // Set the wadrobe_id in local storage
  localStorage.setItem('wadrobe_id', wadrobeId);
  localStorage.setItem('wadrobe_name', wadrobename);
  
  // Redirect to /category page
  router.push({ path: '/categories' });
};
</script>
<template>
  <h1>Your Wadrobes</h1>
  <main class="container flex  h-screen mx-auto w-full">
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
                <tr v-for="wadrobe in wadrobes" :key="wadrobe.id"  @click="goToCategory(wadrobe.id, wadrobe.description)" > 
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