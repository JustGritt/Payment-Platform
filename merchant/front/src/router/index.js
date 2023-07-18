import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/TheHome.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
    {
        path: '/', 
        name: 'Home',
        component: Home,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: '/dashboard/settings',
                name: 'Settings',
                component: () => import('../views/Settings.vue'),
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
