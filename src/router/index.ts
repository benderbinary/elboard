import { createRouter, createWebHistory } from 'vue-router'
import MainContentView from '@/views/MainContentView.vue'
import TableView from '@/views/TableView.vue'
import AboutView from '@/views/AboutView.vue'

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
      component: AboutView
    },
    {
      path: '/table',
      name: 'table',
      component: TableView
    }
  ]
})

export default router
