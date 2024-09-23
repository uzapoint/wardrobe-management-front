<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header text-center">
            <h2>Login</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="mb-3">
                <label class="col-md-4 col-form-label" for="email" >Email:</label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  v-model="email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password:</label>
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  v-model="password"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary w-100">Login</button>
            </form>
            <p v-if="error" class="text-danger mt-3">{{ error }}</p>
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
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    login() {
      axios.post('/login', {
        email: this.email,
        password: this.password,
      })
      .then(response => {
        // Store the token in localStorage
        localStorage.setItem('token', response.data.access_token);

        // Set the default Authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;

        // Redirect to a protected route, such as dashboard
        this.$router.push('/createclothing');
      })
      .catch(error => {
        this.error = 'Login failed, please check your credentials.';
        console.error(error);
      });
    }
  }
};
</script>

<style scoped>
.card {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
