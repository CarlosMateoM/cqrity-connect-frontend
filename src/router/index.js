import { createRouter, createWebHistory } from 'vue-router'

import userRoutes from '@/modules/user/routes/userRoutes'
import authRoutes from '@/modules/auth/routes/authRoutes'
import accessLogRoutes from '@/modules/accessLog/routes/accessLogRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'login' },
    },
    ...userRoutes,
    ...authRoutes,
    ...accessLogRoutes
  ],
});

export default router
