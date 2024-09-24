<template>
    <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
      data-sidebar-position="fixed" data-header-position="fixed">
      <div class="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div class="d-flex align-items-center justify-content-center w-100">
          <div class="row justify-content-center w-100">
            <div class="col-md-8 col-lg-6 col-xxl-4">
              <div class="card mb-0">
                <div class="card-body">
                  <form @submit.prevent="resetPassword">
                    <div class="mb-3">
                      <label for="email" class="form-label">Email</label>
                      <input type="email" v-model="user.email" class="form-control" required>
                      <span v-if="errors.email" class="text-danger">{{ errors.email[0] }}</span>
                    </div>
  
                    <div class="mb-3">
                      <label for="password" class="form-label">New Password</label>
                      <input type="password" v-model="user.password" class="form-control" required>
                      <span v-if="errors.password" class="text-danger">{{ errors.password[0] }}</span>
                    </div>
  
                    <div class="mb-3">
                      <label for="password_confirmation" class="form-label">Confirm New Password</label>
                      <input type="password" v-model="user.password_confirmation" class="form-control" required>
                      <span v-if="errors.password_confirmation" class="text-danger">{{ errors.password_confirmation[0] }}</span>
                    </div>
  
                    <span v-if="errors.error" class="text-danger">{{ errors.error[0] }}</span>
                    <button type="submit" class="btn btn-primary w-100 py-2">Reset Password</button>
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
  import axios from 'axios';
  
  const user = ref({
    email: '',
    password: '',
    password_confirmation: ''
  });
  const errors = ref({});
  const successMessage = ref('');
  const router = useRouter();
  const token = router.currentRoute.value.query.token;
  
  const BASE_URL = 'http://127.0.0.1:8000';
  
  const resetPassword = async () => {
    try {
      errors.value = {};
      successMessage.value = '';
  
      const response = await axios.post(`${BASE_URL}/api/reset`, {
        token,
        email: user.value.email,
        password: user.value.password,
        password_confirmation: user.value.password_confirmation,
      });
  
      if (response.data.success) {
        successMessage.value = 'Password reset successfully! Redirecting to login...';
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        console.error('Unexpected response:', response.data);
        errors.value = { error: ['Unexpected response from server'] };
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      if (error.response) {
        errors.value = error.response.data.errors || { error: ['An error occurred'] };
      } else {
        errors.value = { error: ['An error occurred while resetting the password'] };
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any necessary styles here */
  </style>
  