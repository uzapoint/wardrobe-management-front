import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import apiClient from './api/apiClient'; // Ensure this path is correct

const app = createApp(App);

// Set axios instance globally (optional, use if you need global access)
app.config.globalProperties.$axios = apiClient; 

app.use(router);
app.mount('#app');
