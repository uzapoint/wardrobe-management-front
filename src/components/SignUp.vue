<template>
<div class="">
    <p class="text-2xl text-center font-bold">Register to access your wardrobe</p>
        <form @submit.prevent="register" class="max-w-lg mx-auto shadow-md p-4 text-left">
          <div class="mb-5">
            <label for="name" class="block mb-2 text-sm  font-medium text-gray-900 dark:text-white ">Your Name</label>
            <input type="name" v-model="name" id="name" class="shadow-sm   border border-gray-500 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="" required />
          </div>
          <div class="mb-5">
            <label for="email" class="block mb-2 text-sm  font-medium text-gray-900 dark:text-white ">Your email</label>
            <input type="email" v-model="email" id="email" class="shadow-sm  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="" required />
          </div>
          <div class="mb-5">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white rounded-lg">Your password</label>
            <input type="password" v-model="password" id="password" class="shadow-sm  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
          </div>
          <div class="mb-5">
            <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white rounded-lg">Repeat password</label>
            <input type="password" v-model="password_confirmation" id="repeat-password" class="shadow-sm  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
          </div>
         
          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
        </form>
        <div class=" mt-3">Don't have an account? <a href="/login" class="text-blue-600 underline-offset-1 underline"> Login</a></div>
</div>
  </template>
  
  <script>
  import axios from '../utils/axios.js'; // Adjust the path based on your project structure
  
  export default {
    data() {
      return {
        name:'',
        email: '',
        password: '',
        password_confirmation: '',
       
      };
    },
    methods: {
      async register() {
        if (this.password !== this.password_confirmation) {
          alert("Passwords do not match!");
          return;
        }
  
       
  
        try {
          await axios.post('/register', {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation,
          });
          alert("Registration successful!");
          // Optionally redirect or clear the form
          this.name = '';
          this.email = '';
          this.password = '';
          this.password_confirmation = '';
           
      
      // Redirect to the login page
      this.$router.push('/login');
          
        } catch (error) {
          console.error('Registration error:', error);
          alert("Registration failed. Please try again.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  
  </style>
  