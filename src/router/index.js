import Vue from 'vue'
import VueRouter from 'vue-router'
import QuestionsScreen from '../views/QuestionsScreen.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: QuestionsScreen
  },
  {
    path: '/questions',
    name: 'Questions',
    component: QuestionsScreen
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
