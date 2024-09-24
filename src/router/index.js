// import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import ClothesList from '../components/ClothesList.vue';
import AddEditClothes from '../components/AddEditClothes.vue';
import Login from '../components/LoginView.vue';
import Signup from '../components/RegisterView.vue';

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
  },
  {
    path: '/clothes',
    name: 'clothes-list',
    component: ClothesList,
    meta: { requiresAuth: true },  // Require authentication
  },
  {
    path: '/add',
    name: 'add-clothes',
    component: AddEditClothes,
    meta: { requiresAuth: true },  // Require authentication
  },
  {
    path: '/edit/:id',
    name: 'edit-clothes',
    component: AddEditClothes,
    meta: { requiresAuth: true },  // Require authentication
  },
  {
    path: '/delete/:id',
    name: 'delete-clothes',
    component: AddEditClothes,
    meta: { requiresAuth: true },  // Require authentication
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'login' });  // Redirect to login if not authenticated
  } else {
    next();  // Proceed to the route
  }
});

export default router;
