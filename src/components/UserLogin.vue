<template>
  <div class="container d-flex align-items-center justify-content-center min-vh-100">
    <div class="card shadow" style="width: 400px;">
      <div class="card-body">
        <h2 class="card-title text-center">Login</h2>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" v-model="email" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="password" v-model="password" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
          <div v-if="error" class="text-danger mt-2">{{ error }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/login', {
          email: this.email,
          password: this.password,
        });

        localStorage.setItem('token', response.data.token);
        this.$router.push('/clothing-items');
      } catch (error) {
        console.error('Login failed:', error);
        this.error = error.response ? error.response.data.message : 'An unexpected error occurred.';
      }
    },
  },
};
</script>
<style scoped>
.container {
  background-color: #f8f9fa; /* Light background color */
}

.card {
  border-radius: 10px; /* Rounded corners for the card */
}
</style>
