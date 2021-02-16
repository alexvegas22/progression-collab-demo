import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Exercice from "@/views/Exercice";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  { path: "/exercice",
    name: "Exercice",
    component: Exercice
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
