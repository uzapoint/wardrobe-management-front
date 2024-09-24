<template>
    <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
      data-sidebar-position="fixed" data-header-position="fixed">
      <div class="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div class="d-flex align-items-center justify-content-center w-100">
          <div class="row justify-content-center w-100">
            <div class="col-md-8 col-lg-6 col-xxl-4">
              <div class="card mb-0">
                <div class="card-body">
                  <h3 class="text-center">Add Category</h3>
                  <form @submit.prevent="addCategory">
                    <div class="mb-3">
                      <label for="name" class="form-label">Category Name</label>
                      <input type="text" v-model="category.name" class="form-control" required>
                      <span v-if="errors.name" class="text-danger">{{ errors.name[0] }}</span>
                    </div>
  
                    <button type="submit" class="btn btn-primary w-100 py-2">Create Category</button>
  
                    <div v-if="errors.error" class="text-danger mt-3">{{ errors.error[0] }}</div>
                  </form>
  
                  <div v-if="successMessage" class="alert alert-success mt-3">
                    {{ successMessage }}
                  </div>
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
  import { useNotificationStore } from '@/stores/notificationStore';
  import axios from 'axios';
  
  const router = useRouter();
  const userStore = useUserStore();
  const notificationStore = useNotificationStore();
  
  const category = ref({
    name: ''
  });
  const errors = ref({});
  const successMessage = ref('');
  
  const BASE_URL = 'http://127.0.0.1:8000';
  
  const addCategory = async () => {
    try {
      errors.value = {};
      const token = userStore.token;
  
      const response = await axios.post(`${BASE_URL}/api/categories`, category.value, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
  
      if (response.data.success) {
        successMessage.value = 'Category created successfully!';
        notificationStore.showNotification(successMessage.value, 'success');
        router.push('/dashboard/categories');
      } else {
        console.error('Unexpected response:', response.data);
        errors.value = { error: ['Unexpected response from server'] };
      }
    } catch (error) {
      console.error('Error creating category:', error);
      if (error.response) {
        errors.value = error.response.data.errors || { error: ['An error occurred'] };
      } else {
        errors.value = { error: ['An error occurred while creating the category'] };
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  