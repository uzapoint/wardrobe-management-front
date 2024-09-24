<template>
    <div class="container">
      <h2 class="text-center mb-4">Register</h2>
      <form @submit.prevent="register" class="shadow p-4 rounded bg-white">
        <div class="form-group mb-3">
          <label for="name">Name</label>
          <input
            type="text"
            v-model="form.name"
            id="name"
            class="form-control"
            required
            placeholder="Enter your name"
          />
        </div>
  
        <div class="form-group mb-3">
          <label for="email">Email</label>
          <input
            type="email"
            v-model="form.email"
            id="email"
            class="form-control"
            required
            placeholder="Enter your email"
          />
        </div>
  
        <div class="form-group mb-3">
          <label for="password">Password</label>
          <input
            type="password"
            v-model="form.password"
            id="password"
            class="form-control"
            required
            placeholder="Enter your password"
          />
        </div>
  
        <div class="form-group mb-4">
          <label for="password_confirmation">Confirm Password</label>
          <input
            type="password"
            v-model="form.password_confirmation"
            id="password_confirmation"
            class="form-control"
            required
            placeholder="Confirm your password"
          />
        </div>
  
        <button type="submit" class="btn btn-primary w-100">Register</button>
  
        <div v-if="error" class="text-danger mt-2">{{ error }}</div> <!-- Show error message here -->
  
        <div class="mt-3 text-center">
          <p>
            Already have an account? 
            <router-link to="/login" class="text-primary">Login here</router-link>
          </p>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from '../axios';
  
  export default {
    data() {
      return {
        form: {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        },
        error: null, // Variable to store error messages
      };
    },
    methods: {
      async register() {
        try {
          const response = await axios.post('/register', this.form);
          console.log('User registered:', response.data);
  
          // Save the token if registration is successful
          localStorage.setItem('auth_token', response.data.token);
          
          // Redirect to the dashboard or clothing items page
          this.$router.push('/login');
        } catch (error) {
          // Handle errors
          if (error.response) {
            // Display error messages returned by the server
            this.error = error.response.data.message || 'An unexpected error occurred.';
          } else {
            // Handle network errors
            this.error = 'Network error, please try again.';
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 500px;
    margin-top: 20px;
  }
  
  h2 {
    font-size: 24px;
    font-weight: bold;
  }
  
  .form-control {
    border: 1px solid #ced4da;
    border-radius: 0.375rem;
  }
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }
  
  .text-center {
    text-align: center;
  }
  
  .text-primary {
    color: #007bff;
  }
  
  .text-primary:hover {
    text-decoration: underline;
  }
  
  .shadow {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  </style>
  