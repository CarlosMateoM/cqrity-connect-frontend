export default [
    {
        path: '/history',
        name: 'history',
        component: () => import('@/modules/accessLog/views/AccessLogView.vue'),
        //beforeEnter: guestUser
        meta: {
            layout: 'AppLayout',
        }
    },
]