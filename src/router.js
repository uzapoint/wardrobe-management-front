// src/router.js for Vue 3
import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login-page.vue';
import Register from './components/Register-page.vue';
import Dashboard from './components/Dashboard-page.vue';
import updateClothing from './components/UpdateClothingItems-page.vue';
import addClothing from './components/CreateClothingItems-page.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/updateclothing',
    name: 'updateClothing',
    component: updateClothing,
    meta: { requiresAuth: true },
  },
  {
    path: '/createclothing',
    name: 'addClothing',
    component: addClothing,
    meta: { requiresAuth: true },
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
