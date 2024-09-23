import Vue from 'vue';
import Router from 'vue-router';
import ListClothes from '@/components/ListClothes.vue';
import AddEditClothes from '@/components/AddEditClothes.vue';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', component: ListClothes },
    { path: '/add', component: AddEditClothes },
    { path: '/edit/:id', component: AddEditClothes }
  ]
});
