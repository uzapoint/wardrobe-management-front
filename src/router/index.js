import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/userState';
import Login from '@/components/Pages/Auth/LogIn.vue';
import GuestLayout from '@/Layouts/GuestLayout.vue'; 
import ClothesCreate from '@/components/Pages/Clothes/ClothesCreate.vue';
import CategoriesIndex from '@/components/Pages/Categories/CategoriesIndex.vue';
import CategoriesCreate from '@/components/Pages/Categories/CategoriesCreate.vue';
import ClothesIndex from '@/components/Pages/Clothes/ClothesIndex.vue';
import DashboardLayout from '@/Layouts/DashboardLayout.vue';
import NotFound from '@/components/Pages/NotFound.vue';
import AuthRegister from '@/components/Pages/Auth/AuthRegister.vue';
import ResetPassword from '@/components/Pages/Auth/ResetPassword.vue';
import PasswordReset from '@/components/Pages/Auth/PasswordReset.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/login', 
  },
  {
    path: '/',
    component: GuestLayout, 
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login,
        meta: { requiresAuth: false },
      },
      {
        path: 'register',
        name: 'Register',
        component: AuthRegister,
        meta: { requiresAuth: false },
      },
      {
        path: 'reset-password',
        name: 'ResetPassword',
        component: ResetPassword,
        meta: { requiresAuth: false },
      },
      {
        path: 'reset',
        name: 'PasswordReset',
        component: PasswordReset,
        meta: { requiresAuth: false },
      },
    ],
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: ClothesIndex },
      { path: 'clothes/create', component: ClothesCreate },
      { path: 'categories', component: CategoriesIndex },
      { path: 'categories/create', component: CategoriesCreate },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isAuthenticated = !!userStore.getToken;

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login');
  } else if (to.name === 'Login' && isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
