import { createWebHistory, createRouter } from "vue-router"
import Cloth from "@/components/clothes.vue";


const routes = [
  //login
  { path: "/", component: Cloth, meta: { title: 'Cloth' } },
  { path: "/clothes", component: Cloth, meta: { title: 'Cloth' } },
 
] 

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: "active",
})


export default router