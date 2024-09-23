<template>
  <p class="text-2xl text-center font-bold">Login to access you wardrobe</p>
  <form @submit.prevent="login" class="max-w-sm mx-auto p-6 text-left bg-white rounded-lg shadow-md dark:bg-gray-800">
    <div class="mb-5">
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
      <input
        type="email"
        id="email"
        v-model="email"
        placeholder=""
        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        required
      />
    </div>

    <div class="mb-5">
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
      <input
        type="password"
        id="password"
        v-model="password"
        placeholder="••••••••"
        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        required
      />
    </div>

    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Login
    </button>
  </form>
  <div class="mt-3">Don't have an account? <a href="/register" class="text-blue-600 underline-offset-1 underline"> Register</a></div>
</template>
  
<script>
import axios from '../utils/axios.js';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
   async login() {
  try {
    const response = await axios.post('/login', {
      email: this.email,
      password: this.password,
    });

    console.log(response.data); // Log response to ensure it contains the token

    const token = response.data.token; // Get token from the response
    if (token) {
      localStorage.setItem('authToken', token); // Save token
      this.$router.push('/clothes'); // Redirect to clothes page
    } else {
      alert('Login failed. No token received.');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Login failed. Please try again.');
  }
}
  },
};
</script>
  