import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '@/components/LoginComponent.vue';
import ClothList from '@/components/ClothList.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: LoginComponent // Default route shows login
    },

    {
        path: '/clothes',
        name: 'ClothList',
        component: ClothList,
        // meta: { requiresAuth: true } // Requires authentication
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Navigation guard to check for authentication
// router.beforeEach((to, from, next) => {
//     const isAuthenticated = false; // Replace this with actual auth check

//     if (to.meta.requiresAuth && !isAuthenticated) {
//         next({ name: 'Home' }); // Redirect to login if not authenticated
//     } else {
//         next(); // Proceed to the route
//     }
// });

export default router;