import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/landing/LandingPage.vue')
    },
    {
      path: '/auth',
      component: () => import('@/pages/auth/AuthPage.vue')
    },
    {
      path: '/dashboard',
      component: () => import('@/pages/dashboard/DashboardPage.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/form',
      component: () => import('@/pages/dashboard/transactions/TransactionForm.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (auth.loading) return

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    next('/auth')
  } else {
    next()
  }

})

export default router
