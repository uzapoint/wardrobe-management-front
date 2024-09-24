<template>
  <div class="container">
    <h2>Create Clothing Item</h2>
    
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" id="name" v-model="form.name" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="size" class="form-label">Size</label>
        <input type="text" id="size" v-model="form.size" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="color" class="form-label">Color</label>
        <input type="text" id="color" v-model="form.color" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="category_id" class="form-label">Category</label>
        <select id="category_id" v-model="form.category_id" class="form-select" required>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="file" class="form-label">Image</label>
        <input type="file" id="file" @change="handleFileUpload" class="form-control" accept="image/*" />
      </div>
      <button type="submit" class="btn btn-primary">Create Clothing Item</button>
    </form>
    
    <div v-if="notification" :class="`alert alert-${notification.type}`" class="mt-3">
      {{ notification.message }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNotificationStore } from '@/stores/notificationStore';
import { useRouter } from 'vue-router'; // Import useRouter
import axios from 'axios';
import { useUserStore } from '@/stores/userState';

const form = ref({
  name: '',
  size: '',
  color: '',
  category_id: '',
  file: null
});
const notification = ref(null);
const categories = ref([]);
const userStore = useUserStore();
const notificationStore = useNotificationStore();
const router = useRouter(); 
const BASE_URL = 'http://127.0.0.1:8000';
const token = userStore.getToken;

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/categories`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    categories.value = response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    notificationStore.showNotification('Error fetching categories. Please try again later.', 'error');
  }
};

const handleFileUpload = (event) => {
  form.value.file = event.target.files[0];
};

const submitForm = async () => {
  const formData = new FormData();
  for (const key in form.value) {
    formData.append(key, form.value[key]);
  }

  try {
    const response = await axios.post(`${BASE_URL}/api/clothes`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    
    notification.value = { message: response.data.message, type: 'success' };
    form.value = { name: '', size: '', color: '', category_id: '', file: null }; 

    notificationStore.showNotification(response.data.message, 'success');
    
    router.push('/dashboard/clothes');

  } catch (error) {
    console.error('Error creating clothing item:', error);
    const errorMessage = error.response?.data?.message || 'Error creating clothing item. Please try again later.';
    notification.value = { message: errorMessage, type: 'error' };
    notificationStore.showNotification(errorMessage, 'error');
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
.alert {
  margin-top: 1rem;
}
</style>
