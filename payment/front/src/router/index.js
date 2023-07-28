import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LogsView from '../views/LogsView.vue';
import { userState } from '../contexts/User.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }, 
    },
    {
      path: '/logs',
      name: 'logs',
      component: LogsView,
      meta: { requiresAuth: true }, // Add this line to require authentication for this route
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/merchant',
      name: 'merchant',
      component: () => import('../views/ValidateMerchantView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/InpersonateView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: () => import('../views/TransactionsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/operations',
      name: 'operations',
      component: () => import('../views/OperationsView.vue'),
      meta: { requiresAuth: true },
    },


    {
      path: '/admin404',
      name: 'admin404',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  // If the route requires authentication and the user is not logged in, redirect to the login page
  if (requiresAuth && !userState.user ) {
    next({ name: 'login' }); // Update 'Login' to the name of your login route
  }
  // Prevent the user to access login and register page when logged in
  else if(to.name === 'login' && userState.user) {
    next({ name: 'home' });
  }
  else if(to.name === 'Register' && userState.user) {
    next({ name: 'home' });
  }
  else {
    // Otherwise, allow access to the route
    next();
  }
});

export default router;
