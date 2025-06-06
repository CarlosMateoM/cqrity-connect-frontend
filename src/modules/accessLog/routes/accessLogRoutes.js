import { authenticatedUser } from '@/middleware/auth';

export default [
    {
        path: '/history',
        name: 'history',
        component: () => import('@/modules/accessLog/views/AccessLogView.vue'),
        beforeEnter: authenticatedUser,
        meta: {
            layout: 'AppLayout',
        }
    },
]