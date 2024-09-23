// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Ensure the router is correctly imported

const app = createApp(App);
app.use(router); // Make sure to use the router
app.mount
