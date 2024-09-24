<template>
  <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
    data-sidebar-position="fixed" data-header-position="fixed">
    <div class="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
      <div class="d-flex align-items-center justify-content-center w-100">
        <div class="row justify-content-center w-100">
          <div class="col-md-8 col-lg-6 col-xxl-3">
            <div class="card mb-0">
              <div class="card-body">
                <form @submit.prevent="loginUser">
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Username</label>
                    <input type="email" v-model="user.email" class="form-control" aria-describedby="emailHelp" required>
                    <span v-if="errors.email" class="text-danger">{{ errors.email[0] }}</span>
                  </div>
                  <div class="mb-4">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" v-model="user.password" class="form-control" required>
                    <span v-if="errors.password" class="text-danger">{{ errors.password[0] }}</span>
                  </div>
                  <span v-if="errors.error" class="text-danger">{{ errors.error[0] }}</span>
                  <div class="d-flex align-items-center justify-content-between mb-4">
                    <div class="form-check">
                      <input class="form-check-input primary" type="checkbox" value="" id="flexCheckChecked" checked>
                      <label class="form-check-label text-dark" for="flexCheckChecked">
                        Remember this Device
                      </label>
                    </div>
                    <RouterLink class="text-primary fw-bold" to="/reset-password">Forgot Password?</RouterLink>
                  </div>
                  <button type="submit" class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Sign In</button>
                  <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
                  <div class="d-flex align-items-center justify-content-center">
                    <p class="fs-4 mb-0 fw-bold">New to Wardrobe?</p>
                    <RouterLink class="text-primary fw-bold ms-2" to="/register">Create an account</RouterLink>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userState';
import axios from 'axios';

const userStore = useUserStore();
const router = useRouter();

const user = ref({ email: '', password: '' });
const errors = ref({});
const successMessage = ref(''); // Define success message variable

const BASE_URL = 'http://127.0.0.1:8000';

const loginUser = async () => {
  try {
    errors.value = {};
    successMessage.value = '';

    const response = await axios.post(`${BASE_URL}/api/login`, user.value);

    if (response.data.success) {
      userStore.setUser({ user: response.data.user, token: response.data.token });
      successMessage.value = 'Login successful! Redirecting to dashboard...'; 
      setTimeout(() => {
        router.push('/dashboard'); 
      }, 2000);
    } else {
      console.error('Unexpected response:', response.data);
      errors.value = { error: ['Unexpected response from server'] };
    }
  } catch (error) {
    console.error('Error logging in:', error);
    if (error.response) {
      errors.value = error.response.data.errors || { error: ['An error occurred'] };
    } else {
      errors.value = { error: ['An error occurred while logging in'] };
    }
  }
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>
