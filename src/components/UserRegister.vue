<template>
    <div class="bg-gray-100 min-h-screen flex items-center justify-center">
       <!-- Background Image -->
       <div class="absolute inset-0 z-0">
           <img src="https://source.unsplash.com/random/1920x1080" alt=""
               class="w-full h-full object-cover filter blur-lg brightness-50">
       </div>
   
       <!-- Login Form -->
       <div class="relative z-10 bg-white p-8 rounded-md shadow-lg">
           <h1 class="text-xl font-bold mb-4">Login</h1>
           <form @submit.prevent="login">
             <div v-if="error">{{ error }}</div>
             <div class="mb-4">
                   <label class="block text-gray-700 font-bold mb-2" for="name">Name</label>
                   <input
                   v-model="name"
                       class="appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                       id="name" type="text" placeholder="Name">
               </div>
               <div class="mb-4">
                   <label class="block text-gray-700 font-bold mb-2" for="email">Email</label>
                   <input
                   v-model="email"
                       class="appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                       id="email" type="email" placeholder="Email">
               </div>
               <div class="mb-4">
                   <label class="block text-gray-700 font-bold mb-2" for="password">Password</label>
                   <input
                   v-model="password"
                       class="appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                       id="password" type="password" placeholder="Password">
               </div>
               <div class="mb-4">
                   <label class="block text-gray-700 font-bold mb-2" for="password">Repeat Password</label>
                   <input
                   v-model="password_confirm"
                       class="appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                       id="password" type="password" placeholder="Repeat Password">
               </div>
               <div class="flex items-center justify-between gap-8">
                   <button
                   
                       class="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                       type="submit">
                       Sign <ion-icon name="thumbs-up"></ion-icon>
                   </button>
                   <router-link to="/">Sign In Instead</router-link>
               </div>
           </form>
       </div>
   </div>
   </template>
   
   <script>
   import axios from 'axios';
   import { mapActions } from 'vuex';
   export default {
     data() {
       return {
        name: '',
         email: '',
         password: '',
         password_confirm: '',
         error: null,
       };
     },
     methods: {
       ...mapActions(['setUserDetails', 'setToken']),
       
       async login() {
         try {
           const response = await axios.post('/register', {
            name: this.name,
             email: this.email,
             password: this.password,
             password_confirmation: this.password_confirm,
           });
   
           
           // Save user details and token in Vuex store
          // this.setUserDetails(response.data.user);
           //this.setToken(response.data.token);
           localStorage.setItem('token', response.data.token);
           localStorage.setItem('user_id', response.data.user.id);
           
           // Redirect to home page
           this.$router.push('/home');
         } catch (err) {
           this.error = err.response.data.message || 'Registration failed. Please try again.';
           console.error(err);
         }
       },
     },
   };
   
   </script>
   
   
   