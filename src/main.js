// src/main.js for Vue 3
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Import DataTables and its Bootstrap 5 integration
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5/js/dataTables.bootstrap5.min.js';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  
import axios from 'axios';

// Import global styles
// main.js
import './assets/css/style.css';


const app = createApp(App);

// Set Axios default base URL
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'; // Adjust accordingly

app.use(router);
app.mount('#app');
