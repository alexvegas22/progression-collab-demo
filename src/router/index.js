import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/solutions',
    name: 'Solutions',
    component: () => import(/* webpackChunkName: "about" */ '../views/SolutionsView.vue')
  },
  {
    path: '/question',
    name: 'Question',
    component: () => import('../views/Question.vue')
  },
  {
    path: '/validation',
    name: 'Validation',
    component: () => import(/* webpackChunkName: "question" */ '../views/Validation.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
