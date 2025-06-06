import { authenticatedUser } from '@/middleware/auth';

export default [
    {
        path: '/home',
        name: 'users.home',
        component: () => import('@/modules/user/views/HomeView.vue'),
        beforeEnter: authenticatedUser,
        meta: {
            layout: 'AppLayout',
        }
    },
    {
        path: '/users',
        name: 'users.index',
        component: () => import('@/modules/user/views/UsersView.vue'),
        beforeEnter: authenticatedUser,
        meta: {
            layout: 'AppLayout',
        }
    },
    {
        path: '/users/nuevo',
        name: 'users.create',
        component: () => import('@/modules/user/views/UserFormView.vue'),
        beforeEnter: authenticatedUser,
        meta: {
            layout: 'AppLayout',
        }
    },
    {
        path: '/users/:id/edit',
        name: 'users.edit',
        component: () => import('@/modules/user/views/UserFormView.vue'),
        beforeEnter: authenticatedUser,
        meta: {
            layout: 'AppLayout',
        }
    } 
]