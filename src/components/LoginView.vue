<template>
  <div class="login-container">
    <div class="card login-card">
      <h1 class="text-center title">Login</h1>
      <form @submit.prevent="login" class="p-4">
        <div class="form-group mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            v-model="email"
            id="email"
            type="email"
            class="form-control"
            placeholder="Enter your email"
            required
          />
        </div>
        <br>
        <div class="form-group mb-8">
          <label for="password" class="form-label">Password</label>
          <input
            v-model="password"
            id="password"
            type="password"
            class="form-control"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
        <p class="text-center mt-3">
          Don't have an account? 
          <router-link to="/signup" class="signup-link">Sign up here</router-link>
        </p>
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
      email: '',
      password: ''
    };
  },
  methods: {
    ...mapActions(['setUser']),
    login() {
      axios.post('http://wardrobe-management-system.test:8000/api/login', {
        email: this.email,
        password: this.password
      })
      .then(response => {
        const token = response.data.token;
        localStorage.setItem('token', token);
        this.setUser(response.data.user);
        this.$router.push('/clothes');
      })
      .catch(error => {
        console.error(error);
        alert('Login failed. Please check your credentials.');
      });
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 1rem;
}
.title{
  text-align:center;
}

.login-card {
  padding:5rem;
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.login-card:hover {
  transform: scale(1.02);
}

h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-label {
  font-weight: bold;
  font-size: 1rem;
  color: #555;
  padding-right:2rem;
}

input {
  font-size: 1rem;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

button {
  padding: 0.4rem;
  font-size: 1.2rem;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s;
  margin-top:2rem;
}

button:hover {
  background-color: #0056b3;
  transform: translateY(-1px);
}

p {
  margin-top: 1rem;
  color: #666;
}

.signup-link {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.signup-link:hover {
  text-decoration: underline;
}
</style>
