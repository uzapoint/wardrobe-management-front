<!-- resources/js/components/ForgotPassword.vue -->

<template>
    <div class="container">
      <h1>Forgot Password</h1>
      <form @submit.prevent="sendResetLink">
        <div class="mb-3">
          <label for="email" class="form-label">Email Address</label>
          <input type="email" v-model="email" id="email" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary">Send Password Reset Link</button>
      </form>
      <div v-if="message" class="alert alert-success mt-3">{{ message }}</div>
      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    </div>
  </template>
  
  <script>
  import axios from '../axios';
  
  export default {
    data() {
      return {
        email: '',
        message: '',
        error: '',
      };
    },
    methods: {
      async sendResetLink() {
        this.message = '';
        this.error = '';
  
        try {
          const response = await axios.post('/forgot-password', {
            email: this.email,
          });
  
          this.message = response.data.message; // Success message from Laravel
        } catch (err) {
          if (err.response && err.response.data.message) {
            this.error = err.response.data.message; // Error message from Laravel
          } else {
            this.error = 'An unexpected error occurred.';
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  