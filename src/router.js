// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import ClothesList from './components/ClothesList.vue'; 
import LogIn from './components/LogIn.vue';
import SignUp from './components/SignUp.vue';
import AddUpdateClothes from './components/AddUpdateClothes.vue'



const routes = [
    { path: '/login', component: LogIn },
    { path: '/register', component: SignUp },
    { path: '/clothes', component: ClothesList, meta: { requiresAuth: true } },
    { path: '/add-cloth',component: AddUpdateClothes, meta: { requiresAuth: true } },
    { path: '/edit-cloth/:id',component: AddUpdateClothes, meta: { requiresAuth: true } },
     
  ];
  

const router = createRouter({
    history: createWebHistory(),
    routes,
});
// Use the updated beforeEach logic
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('authToken');
  
    if (to.path === '/login' || to.path === '/register') {
        next(); // Proceed to login or register page
    } else if (!token) {
        next({ path: '/login' }); // Redirect to login if unauthenticated
    } else if (to.path == '/login' && token) {
        next({ path: '/clothes' }); // Redirect to clothes if already authenticated
    } else {
        next(); // Proceed to requested route
    }
});

export default router;


