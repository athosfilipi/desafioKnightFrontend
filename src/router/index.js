import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/knights',
      name: 'knights',      
      props: route => ({characterClass: 'knight'}),
      component: () => import('../views/CharacterView.vue')
    },
    {
      path: '/heroes',
      name: 'heroes',      
      props: route => ({characterClass: 'hero'}),
      component: () => import('../views/CharacterView.vue')
    },
    {
      path: '/find',
      name: 'find',      
      component: () => import('../views/FindKnightsView.vue')
    },
    {
      path: '/make',
      name: 'make',      
      component: () => import('../views/MakeKnightsView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
