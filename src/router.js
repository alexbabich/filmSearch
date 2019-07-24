import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/search/:title',
      name: 'filmlist',
      component: () => import('./views/PageSearch.vue')
    },
    {
      path: '/film/:id',
      name: 'filmpage',
      component: () => import('./views/PageFilm.vue')
    }
  ]
})
