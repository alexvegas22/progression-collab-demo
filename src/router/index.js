import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/question',
    name: 'Question',
    component: () => import('../views/Question.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
