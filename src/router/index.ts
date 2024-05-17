import { createRouter, createWebHistory } from 'vue-router'
import MainContentView from '@/views/MainContentView.vue'
import TableView from '@/views/TableView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainContentView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/table',
      name: 'table',
      component: TableView
    }
  ]
})

export default router
