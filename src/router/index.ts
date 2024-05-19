import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import SignIn from '@/components/SignIn.vue';
import MainContentView from '@/views/MainContentView.vue';
import TableView from '@/views/TableView.vue';
import AboutView from '@/views/AboutView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainContentView
    },
    {
      path: '/login',
      name: 'login',
      component: SignIn
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
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'fallback',
      redirect: '/'
    }
  ]
});

router.beforeEach(async (to) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.user) {
    return {
      path: '/login',
      query: { returnUrl: to.fullPath }
    };
  }
});

export default router;
