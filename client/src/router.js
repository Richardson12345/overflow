import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login.vue'
import Home from './views/home.vue'
import Question from './views/questionpage.vue'
import Signup from './views/signup.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/question/:id',
      name: 'question',
      component: Question
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ]
})


