import { guestUser } from '@/middleware/auth';

export default [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/modules/auth/views/LoginView.vue'),
        beforeEnter: guestUser
    },
]