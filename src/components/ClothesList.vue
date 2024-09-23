
<template>
 <div>
   <h1 class="text-lg font-bold mb-5">Welcome to your Wardrobe</h1>
   <div class="max-w-lg mx-auto flex justify-end">
     <button
       @click="redirectToAddCloth"
       class="bg-blue-600 text-white text-right  px-4 py-2 my-3 rounded-lg hover:bg-blue-700 focus:outline-none"
     >
       Add New Cloth
     </button>
   </div>
    <div class="max-w-lg mx-auto shadow-md p-4 text-left">
      <h1 class="text-lg font-bold mb-5">Your Clothes</h1>
        <!-- Add New Cloth Button -->
      <ul v-if="clothes.length">
       <div class=" ">
         <li v-for="cloth in clothes" :key="cloth.id" class="border-b p-4 flex justify-between items-center  hover:bg-gray-200 cursor-pointer rounded-lg" @click="redirectToClothDetail(cloth.id)">
             <!-- If the cloth has an image, display it. Otherwise, show the placeholder -->
             <img
             v-if="cloth.image"
             :src="`http://127.0.0.1:8000/storage/${cloth.image}`"
             alt="Cloth Image"
             class="w-16 h-16 object-cover rounded-lg mr-4"
           />
           <img
             v-else
             src="https://via.placeholder.com/150"
             alt="Placeholder Image"
             class="w-16 h-16 object-cover rounded-lg mr-4"
           />
           <div>
             <p class="font-semibold">{{ cloth.name }}</p>
             <p class="text-sm text-gray-500">{{ cloth.category }} ({{ cloth.size }}, {{ cloth.color }})</p>
           </div>
           <button type="button" class="p-2 border  rounded-lg hover:bg-blue-700 bg-blue-600 text-white " @click="(event) => deleteCloth(event, cloth.id)" ><i class="bi bi-trash3"></i></button>
         </li>
       </div>
      </ul>
      <p v-else>No clothes found.</p>
    </div>
    <div class="max-w-lg mx-auto flex justify-end">
     <button @click="logout"      
       class="bg-blue-600 text-white text-right  px-4 py-2 my-3 rounded-lg hover:bg-blue-700 focus:outline-none">
       Logout <i class="bi bi-box-arrow-right"></i>
     </button>
   </div>
 </div>
</template>

<script>
import axios from '../utils/axios.js';

export default {
  data() {
    return {
      clothes: [],
    };
  },
  created() {
    this.fetchClothes();
  },
  methods: {
    async deleteCloth(event, id) {
  event.stopPropagation(); // Prevent the click event from bubbling up
  const confirmed = confirm("Are you sure you want to delete this item?");
  if (confirmed) {
    try {
      await axios.delete(`/clothes/${id}`);
      alert("Item deleted successfully!");
      this.fetchClothes(); // Refresh the list
    } catch (error) {
      console.error('Delete error:', error);
      alert("Failed to delete the item.");
    }
  }
},
  logout() {
      localStorage.removeItem('authToken'); // Remove the token
      this.$router.push('/login'); // Redirect to the login page
    },
    async fetchClothes() {
      try {
        const response = await axios.get('/clothes');
        this.clothes = response.data;
      } catch (error) {
        console.error('Error fetching clothes:', error);
        if (error.response && error.response.status === 401) {
          // Redirect to login if unauthorized
          this.$router.push('/login');
        }
      }
    },
    redirectToAddCloth() {
      this.$router.push('/add-cloth');
    },
    redirectToClothDetail(clothId) {
      this.$router.push(`/edit-cloth/${clothId}`);
    },
  },
};
</script>
