import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const redirectIfNotDevMode = (to: any, from: any, next: any) => {
  if (import.meta.env.MODE === 'dev') {
    next()
  } else {
    next({ path: '/' })
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/documentation',
      name: 'documentation',
      component: () => import('../views/DocumentationView.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      children: [
        {
          path: '/components',
          name: 'components',
          component: () => import('../views/ComponentsView.vue'),
          beforeEnter: redirectIfNotDevMode,
        },
      ],
    },
  ],
})

export default router
