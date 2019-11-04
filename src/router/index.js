import Vue from 'vue'
import VueRouter from 'vue-router'
import Questions from '../views/Questions.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Questions
  },
  {
    path: '/questions',
    name: 'Questions',
    component: Questions
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
