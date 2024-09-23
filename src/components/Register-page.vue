<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow">
            <div class="card-header text-center">
              <h2 class="mb-0">Register</h2>
            </div>
            <div class="card-body">
              <form @submit.prevent="register" class="needs-validation" novalidate>
                <div class="mb-3">
                  <label for="name" class="form-label">Name:</label>
                  <input type="text" id="name" class="form-control" v-model="name" required />
                  <div class="invalid-feedback">Please provide a valid name.</div>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email:</label>
                  <input type="email" id="email" class="form-control" v-model="email" required />
                  <div class="invalid-feedback">Please provide a valid email address.</div>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password:</label>
                  <input type="password" id="password" class="form-control" v-model="password" required />
                  <div class="invalid-feedback">Please provide a password.</div>
                </div>
                <div class="mb-3">
                  <label for="password_confirmation" class="form-label">Confirm Password:</label>
                  <input type="password" id="password_confirmation" class="form-control" v-model="password_confirmation" required />
                  <div class="invalid-feedback">Please confirm your password.</div>
                </div>
                <button type="submit" class="btn btn-primary w-100">Register</button>
              </form>
              <p v-if="error" class="text-danger text-center mt-3">{{ error }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        error: '',
      };
    },
    methods: {
      register() {
        axios
          .post('/register', {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation,
          })
          .then((response) => {
            localStorage.setItem('token', response.data.access_token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
            this.$router.push('/dashboard');
          })
          .catch((error) => {
            this.error = 'Registration failed, please try again.';
            console.error(error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Additional custom styles */
  .card {
    border-radius: 10px;
  }
  
  .card-header {
    background-color: #f8f9fa;
    font-weight: bold;
  }
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
  }
  </style>
  