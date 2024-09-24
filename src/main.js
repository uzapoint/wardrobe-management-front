import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Assuming you have a router set up
import store from './store';   // Assuming you are using Vuex

createApp(App)
  .use(router)
  .use(store)
  .mount('#app');