import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/icon',
      component:()=>import('@/components/menu/index.vue'),
      children: [
        {
          path: 'icon',
          component: () => import('@/views/icon/index.vue')
        },
        {
          path: 'button',
          component: () => import('@/views/button/index.vue')
        },
      ]
    },
  ]
})

export default router
