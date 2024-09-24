// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import ClothesList from '../components/ClothesList.vue';
import ClothesForm from '../components/ClothesForm.vue';

const routes = [
  {
    path: '/',
    name: 'ClothesList',
    component: ClothesList,
  },
  {
    path: '/clothes/add',
    name: 'AddCloth',
    component: ClothesForm,
  },
  {
    path: '/clothes/edit/:id',
    name: 'EditCloth',
    component: ClothesForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
