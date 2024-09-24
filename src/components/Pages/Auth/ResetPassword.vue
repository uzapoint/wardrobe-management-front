<template>
  <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
    data-sidebar-position="fixed" data-header-position="fixed">
    <div class="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
      <div class="d-flex align-items-center justify-content-center w-100">
        <div class="row justify-content-center w-100">
          <div class="col-md-8 col-lg-6 col-xxl-3">
            <div class="card mb-0">
              <div class="card-body">
                <form @submit.prevent="resetPassword">
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input type="email" v-model="user.email" class="form-control" aria-describedby="emailHelp" required>
                    <span v-if="errors.email" class="text-danger">{{ errors.email[0] }}</span>
                  </div>
                  <span v-if="errors.error" class="text-danger">{{ errors.error[0] }}</span>

                  <button type="submit" class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Reset Password</button>

                  <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
                  <div v-if="errors.error" class="alert alert-danger mt-3">{{ errors.error[0] }}</div>

                  <div class="d-flex align-items-center justify-content-center">
                    <p class="fs-4 mb-0 fw-bold">Remembered your password?</p>
                    <RouterLink class="text-primary fw-bold ms-2" to="/login">Sign In</RouterLink>
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
import axios from 'axios';

const user = ref({ email: '' });
const errors = ref({});
const successMessage = ref('');

const BASE_URL = 'http://127.0.0.1:8000';

const resetPassword = async () => {
  try {
    errors.value = {};
    successMessage.value = '';

    const response = await axios.post(`${BASE_URL}/api/password/reset`, user.value);

    if (response.data.success) {
      successMessage.value = 'Password reset email sent! Please check your inbox.';
      user.value.email = '';
    } else {
      console.error('Unexpected response:', response.data);
      errors.value = { error: ['Unexpected response from server'] };
    }
  } catch (error) {
    console.error('Error resetting password:', error);
    if (error.response) {
      errors.value = error.response.data.errors || { error: ['An error occurred'] };
    } else {
      errors.value = { error: ['An error occurred while resetting password'] };
    }
  }
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>
