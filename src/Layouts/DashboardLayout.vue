<template>
  <div class="d-flex" id="wrapper">
    <div class="bg-light border-right" id="sidebar-wrapper">
      <div class="sidebar-heading">Dashboard</div>
      <div class="list-group list-group-flush">
        <router-link
          class="list-group-item list-group-item-action"
          to="/dashboard"
          exact-active-class="active"
        >
          Clothes
        </router-link>
        <router-link
          class="list-group-item list-group-item-action"
          to="/dashboard/clothes/create"
          active-class="active"
        >
          Create Clothes
        </router-link>
        <router-link
          class="list-group-item list-group-item-action"
          to="/dashboard/categories"
          active-class="active"
        >
          Categories
        </router-link>
        <router-link
          class="list-group-item list-group-item-action"
          to="/dashboard/categories/create"
          active-class="active"
        >
          Create Category
        </router-link>
      </div>
    </div>

    <div id="page-content-wrapper">
      <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <button class="btn btn-primary" id="menu-toggle" @click="toggleSidebar">
          Toggle Menu
        </button>
        <div class="ml-auto">
          <button class="btn btn-outline-danger" @click="logout">Logout</button>
        </div>
      </nav>

      <div class="container-fluid">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userState';
import { useNotificationStore } from '@/stores/notificationStore';
import { computed } from 'vue';
import axios from 'axios';

const router = useRouter();
const userStore = useUserStore();
const notificationStore = useNotificationStore();

const BASE_URL = 'http://127.0.0.1:8000';
const token = computed(() => userStore.getToken);

const logout = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/api/logout`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`,
      },
    });

    if (response.status === 200) {
      userStore.clearUser();
      localStorage.removeItem('token');
      notificationStore.showNotification('Logged out successfully.', 'success');
      router.push('/');
    } else {
      throw new Error('Logout failed!');
    }
  } catch (error) {
    console.error('Logout error:', error);
    notificationStore.showNotification('Server error. Please try again later.', 'error'); 
  }
};

const toggleSidebar = () => {
  document.getElementById('wrapper').classList.toggle('toggled');
};
</script>

<style scoped>
#wrapper {
  display: flex;
  align-items: stretch;
}

#sidebar-wrapper {
  min-width: 250px;
  max-width: 250px;
  background-color: #f8f9fa;
}

#page-content-wrapper {
  flex: 1;
}

.toggled #sidebar-wrapper {
  margin-left: -250px;
}

.list-group-item.active {
  background-color: #007bff;
  color: white;
}
</style>
