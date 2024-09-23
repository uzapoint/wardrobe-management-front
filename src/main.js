// import { createApp } from 'vue'
// import App from './App.vue'
// createApp(App).mount('#app')

import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router
import './index.css'

createApp(App)
    .use(router) // Use the router
    .mount('#app');
