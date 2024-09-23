import { createWebHistory, createRouter } from "vue-router"
import ClothItem from "@/components/ClothItem.vue";


const routes = [
  //login
  { path: "/", component: ClothItem, meta: { title: 'clothes' } },
  { path: "/clothes", component: ClothItem, meta: { title: 'clothes' } },
 
] 

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: "active",
})


export default router