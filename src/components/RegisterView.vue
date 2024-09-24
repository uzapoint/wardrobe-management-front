<template>
  <div class="signup-container">
    <div class="card signup-card">
      <h1 class="text-center">Sign Up</h1>
      <form @submit.prevent="signup" class="p-4">
        <div class="form-group mb-3">
          <label for="name" class="form-label">Name</label>
          <input
            v-model="name"
            id="name"
            type="text"
            class="form-control"
            placeholder="Enter your name"
            required
          />
        </div><br>
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
        </div><br>
        <div class="form-group mb-4">
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
        <button type="submit" class="btn btn-primary w-100">Sign Up</button>
        <p class="text-center mt-3">
          Already have an account? 
          <router-link to="/" class="login-link">Login here</router-link>
        </p>
      </form>
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
      password: ''
    };
  },
  methods: {
    signup() {
      axios.post('http://wardrobe-management-system.test:8000/api/register',{
        name: this.name,
        email: this.email,
        password: this.password
      })
      .then(() => {
        alert('Registration successful! You can now log in.');
        this.$router.push('/');
      })
      .catch(error => {
        console.error(error);
        alert('Registration failed. Please try again.');
      });
    }
  }
};
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
}

.signup-card {
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  padding:5rem;

}

.signup-card:hover {
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
  padding: 0.5rem;
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

.login-link {
  color: #007bff;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
