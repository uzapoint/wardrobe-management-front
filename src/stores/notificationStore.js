import { defineStore } from 'pinia';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    activeNotification: null,
  }),
  actions: {
    showNotification(message, type = 'success') {
      if (this.activeNotification) {
        this.activeNotification.hideToast();
        this.activeNotification = null;
      }

      this.activeNotification = Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: 'bottom',
        position: 'right',
        backgroundColor: type === 'success' ? '#4caf50' : '#f44336',
      }).showToast();
    }
  }
});
