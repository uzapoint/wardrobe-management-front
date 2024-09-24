
import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from "@/plugins/font-awesome";
import {store} from "core-js/internals/reflect-metadata";
import axios from "axios";
import {createMemoryHistory, createRouter} from "vue-router";
import HomePage from "@/components/HomePage.vue";
import LoginPage from "@/components/auth/LoginPage.vue";
import RegisterPage from "@/components/auth/RegisterPage.vue";
import ProfilePage from "@/components/auth/ProfilePage.vue";
import CategoryPage from "@/views/CategoryPage.vue";
import SizePage from "@/views/SizePage.vue";
import ClothesPage from "@/views/ClothesPage.vue";


const routes = [
    {
        path: "/",
        name: "home",
        component: HomePage,
    },
    {
        path: "/home",
        component: HomePage,
    },
    {
        path: "/login",
        component: LoginPage,
    },
    {
        path: "/register",
        component: RegisterPage,
    },
    {
        path: "/profile",
        name: "profile",
        component: ProfilePage,
    },
    {
        path: "/categories",
        name: "categories",
        component: CategoryPage,
    },
    {
        path: "/sizes",
        name: "sizes",
        component: SizePage,
    },
    {
        path: "/clothes",
        name: "clothes",
        component: ClothesPage,
    }
];

axios.defaults.baseURL = "http://localhost:8003/api/";

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

createApp(App)
    .use(router)
    .use(store)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount("#app");
