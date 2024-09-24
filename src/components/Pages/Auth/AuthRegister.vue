<template>
  <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
    data-sidebar-position="fixed" data-header-position="fixed">
    <div class="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
      <div class="d-flex align-items-center justify-content-center w-100">
        <div class="row justify-content-center w-100">
          <div class="col-md-8 col-lg-6 col-xxl-4">
            <div class="card mb-0">
              <div class="card-body">
                <form @submit.prevent="registerUser">
                  <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" v-model="user.name" class="form-control" required>
                    <span v-if="errors.name" class="text-danger">{{ errors.name[0] }}</span>
                  </div>

                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" v-model="user.email" class="form-control" required>
                    <span v-if="errors.email" class="text-danger">{{ errors.email[0] }}</span>
                  </div>

                  <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" v-model="user.password" class="form-control" required>
                    <span v-if="errors.password" class="text-danger">{{ errors.password[0] }}</span>
                  </div>

                  <div class="mb-3">
                    <label for="password_confirmation" class="form-label">Confirm Password</label>
                    <input type="password" v-model="user.password_confirmation" class="form-control" required>
                    <span v-if="errors.password_confirmation" class="text-danger">{{ errors.password_confirmation[0] }}</span>
                  </div>

                  <span v-if="errors.error" class="text-danger">{{ errors.error[0] }}</span>
                  <button type="submit" class="btn btn-primary w-100 py-2">Register</button>
                </form>
                <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
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
import { useNotificationStore } from '@/stores/notificationStore'; // Import notification store
import axios from 'axios';

const userStore = useUserStore();
const notificationStore = useNotificationStore(); // Create an instance of notification store
const router = useRouter();

const user = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
});
const errors = ref({});
const successMessage = ref(''); // Define success message variable

const BASE_URL = 'http://127.0.0.1:8000';

const registerUser = async () => {
  try {
    errors.value = {};
    successMessage.value = ''; // Reset success message on each attempt

    const response = await axios.post(`${BASE_URL}/api/register`, user.value);

    if (response.data.success) {
      userStore.setUser({ user: response.data.user, token: response.data.token });
      successMessage.value = 'Registration successful! Redirecting to dashboard...'; // Set success message
      notificationStore.showNotification(successMessage.value, 'success'); // Show notification
      setTimeout(() => {
        router.push('/dashboard'); // Redirect after a short delay
      }, 2000);
    } else {
      console.error('Unexpected response:', response.data);
      errors.value = { error: ['Unexpected response from server'] };
    }
  } catch (error) {
    console.error('Error registering user:', error);
    if (error.response) {
      errors.value = error.response.data.errors || { error: ['An error occurred'] };
    } else {
      errors.value = { error: ['An error occurred while registering the user'] };
    }
  }
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>
