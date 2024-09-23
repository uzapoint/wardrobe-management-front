<template>

    <div class="flex flex-col items-center p-4 md:p-8 bg-gray-50 ">

        <!-- Add Clothing Item Form -->
        <h2 class="text-2xl font-semibold text-gray-700 mb-4 ">Add A New Cloth</h2>
        <form @submit.prevent="submitCloth"
            class=" md:w-1/4 lg:w-1/4 bg-white shadow-lg rounded-lg p-4 flex flex-col justify-center items-center">
            <div class="flex flex-col  mb-4 px-1 mx-1 w-full">
                <div class="flex flex-row space-x-2  w-full px-2 items-center">

                    <span for="clothing_name" class="text-gray-700 w-44"> Name </span>
                    <input v-model="newItem.clothing_name"
                        class="w-full  mb-4 md:mb-0 p-2  mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Name" required />
                </div>
                <div class="flex flex-row space-x-2  w-full px-2 items-center">

                    <span for="category" class="text-gray-700 w-44"> Category </span>
                    <input v-model="newItem.category"
                        class="w-full  mb-4 md:mb-0 p-2  mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="cloth category" required />
                </div>
                <div class="flex flex-row space-x-2  w-full px-2 items-center">

                    <span for="clothing_name" class="text-gray-700 w-44"> Size </span>
                    <input v-model="newItem.clothing_name"
                        class="w-full  mb-4 md:mb-0 p-2  mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="cloth size" required />
                </div>
                <div class="flex flex-row space-x-2  w-full px-2 items-center">

                    <span for="color" class="text-gray-700 w-44"> Color </span>
                    <input v-model="newItem.color"
                        class="w-full  mb-4 md:mb-0 p-2  mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="color" required />
                </div>
                <div class="flex flex-row space-x-2  w-full px-2 items-center">

                    <span for="image" class="text-gray-700 w-44"> Image </span>
                    <input v-model="newItem.image"
                        class="w-full  mb-4 md:mb-0 p-2  mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="image" required />
                </div>


            </div>
            <button type="submit"
                class=" bg-indigo-500 text-white py-2 px-6 rounded hover:bg-indigo-600 transition duration-200">
                Add
            </button>
        </form>

        <div>
            <h1>Clothes List</h1>
            <ul v-if="clothes.length">
                <li v-for="cloth in clothes" :key="cloth.id">
                    {{ cloth.name }}
                    {{ cloth.color }}
                    {{ cloth.size }}
                    {{ cloth.category }}
                    {{ cloth.image }}
                    <button @click="deleteCloth">Delete</button>
                    <button @click="editCloth">Edit</button>

                </li>
            </ul>
            <p v-else>No clothes found.</p>
        </div>


    </div>


</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            clothes: [],
            newItem: {
                name: '',
                color: '',
                category: '',
                size: '',
                image: '',
                user_id: '1',
            },
        };
    },

    methods: {
        submitCloth() {
            // Post request to the backend
            axios.post('http://127.0.0.1:8000/clothes', this.newCloth)
                .then(response => {
                    console.log(response.data);
                    this.clothes.push(response.data); // Add new cloth to the clothes array
                    this.newCloth = {}; // Clear the form
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        },
        getClothes() {
            // Get request to the backend
            axios.get('http://http://127.0.0.1:8000/clothes')
                .then(response => {
                    console.log(response.data);
                    this.clothingItems = response.data;
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        },

        editCloth() {
            // edit request to the backend
            axios.put('http://127.0.0.1:8000/clothes', this.newCloth)
                .then(response => {
                    console.log(response.data);
                    this.clothes.push(response.data); // Add new cloth to the clothes array
                    this.newCloth = {}; // Clear the form
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });

        },
        deleteCloth() {
            // delete request to the backend
            axios.delete('http://127.0.0.1:8000/clothes', this.newCloth)
                .then(response => {
                    console.log(response.data);
                    this.clothes.push(response.data); // Add new cloth to the clothes array
                    this.newCloth = {}; // Clear the form
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });


        },
    },
    mounted() {
        this.getClothes();
    },
};
</script>
