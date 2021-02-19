import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/Login'
import Question from '../components/Ebauche'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Login
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
    path: '/question',
    name: 'Question',
    component: () => import(/* webpackChunkName: "question" */ '../components/Ebauche.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
