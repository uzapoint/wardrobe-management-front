import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../components/UserLogin.vue'; 
import ClothingItems from '../components/ClothingItems.vue';
import AddClothingItem from '../components/AddClothingItem.vue';
import EditClothingItem from '../components/EditClothingItem.vue';
import ForgotPassword from '../components/ForgotPassword.vue'; 
const routes = [
    { path: '/', redirect: '/login' }, // Redirect root path to login
    { path: '/login', name: 'login', component: UserLogin },
    { path: '/clothing-items', name: 'clothing-items', component: ClothingItems, meta: { requiresAuth: true } },
    { path: '/add', name: 'add-clothing-item', component: AddClothingItem, meta: { requiresAuth: true } },
    { path: '/edit/:id', name: 'edit-clothing-item', component: EditClothingItem, meta: { requiresAuth: true } },
    { path: '/reset-password', name: 'reset-password', component: ForgotPassword }
  ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.matched.some(record => record.meta.requiresAuth) && !token) {
      next('/login'); // Redirect to login if not authenticated
    } else {
      next();
    }
  });

export default router;
