<template>

    <div class="flex flex-col items-center p-4 md:p-8 bg-gray-50 min-h-screen">
        <div>
            <img alt="Vue logo" src="src/assets/wardrobe.png" height="100px;">
        </div>

        <!-- Add Clothing Item Form -->
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Add Clothing Item</h2>
        <form @submit.prevent="addClothingItem" class="w-full md:w-3/4 lg:w-1/2 bg-white shadow-lg rounded-lg p-4">
            <div class="flex flex-col md:flex-row justify-between mb-4 px-1 mx-1">
                <input v-model="newItem.clothing_name"
                    class="w-full md:w-5/12 mb-4 md:mb-0 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Clothing Name" required />
                <input v-model="newItem.color"
                    class="w-full md:w-5/12 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Color" required />
                <input v-model="newItem.wardrobe_id"
                    class="w-full md:w-5/12 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="wardrobe no. eg. 1" required />
                <input v-model="newItem.drawer_id"
                    class="w-full md:w-5/12 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="drawer no. eg. 1" required />
            </div>
            <button type="submit"
                class="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200">
                Add
            </button>
        </form>

        <h1 class="text-2xl font-bold text-gray-800 mb-6 mt-6">Your Cloth items Items</h1>

        <!-- Clothing Items List -->
        <ul class="w-full md:w-3/4 lg:w-1/2 bg-white shadow-lg rounded-lg p-4 mb-6">
            <li v-for="item in clothingItems" :key="item.id"
                class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-lg text-gray-700">{{ item.clothing_name }} - {{ item.wardrobe.wardrobe_name }} - {{
                    item.drawer.drawer_name }} - {{ item.color }}</span>
                <button @click="deleteClothingItem(item.id)"
                    class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 shadow-md transition duration-200">
                    Delete
                </button>
            </li>
        </ul>


    </div>


</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            clothingItems: [],
            newItem: {
                clothing_name: '',
                color: '',
                wardrobe_id: '', // Add your wardrobe_id here
                drawer_id: '',   // Add your drawer_id here
                user_id: '1',     // Add your user_id here
            },
        };
    },
    methods: {
        async fetchClothingItems() {
            const response = await axios.get('http://127.0.0.1:8000/api/clothing');
            console.log(response.data);
            this.clothingItems = response.data;
        },
        async addClothingItem() {
            await axios.post('http://127.0.0.1:8000/api/clothing', this.newItem);
            this.newItem = {}; // Reset the form
            this.fetchClothingItems(); // Refresh the list
        },
        async deleteClothingItem(id) {
            await axios.delete(`http://127.0.0.1:8000/api/clothing/${id}`);
            this.fetchClothingItems(); // Refresh the list
        },
    },
    mounted() {
        this.fetchClothingItems();
    },
};
</script>
