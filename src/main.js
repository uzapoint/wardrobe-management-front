import { createApp } from "vue";
import App from "./App.vue";
import UserLogin from "./components/UserLogin.vue";
import HomeView from "./views/HomeView.vue";
import WadrobeCategory from "./views/WadrobeCategory.vue";
import WadrobeCategoryClothing from "./views/WadrobeCategoryClothing.vue";
import "./main.css";
import axios from "axios";
import { createRouter, createMemoryHistory } from "vue-router";
import UserRegister from "./components/UserRegister.vue";

// Define routes
const routes = [
  { path: "/", component: UserLogin },
  { path: "/register", component: UserRegister },
  { path: "/home", name: "home", component: HomeView },
  { path: "/categories", name: "categories", component: WadrobeCategory },
  { path: "/clothing", name: "clothing", component: WadrobeCategoryClothing },
];

// Create router instance
const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

// Axios base URL configuration
axios.defaults.baseURL = "http://localhost:9080/api/";

// Navigation guard to check for authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token"); // Get token from local storage

  // Check if the user is trying to access the home route
  if (to.name === "home") {
    if (!token) {
      // If no token, redirect to login page
      next({ path: "/" });
    } else {
      // If token exists, allow access to home
      next();
    }
  } else {
    // For all other routes (like login), allow access
    next();
  }
});

// Create and mount the app
createApp(App).use(router).mount("#app");
