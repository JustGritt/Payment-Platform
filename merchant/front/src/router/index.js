import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/TheHome.vue";
import Dashboard from "../views/Dashboard.vue";
import LoginView from "../views/LoginView.vue";

import Cancel from "../views/CancelView.vue";
import Confirm from "../views/ConfirmationView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
        requiresAuth: true,
    },
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/cancel",
    name: "Cancel",
    component: Cancel,
  },
  {
    path: "/confirm",
    name: "Confirm",
    component: Confirm,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
    children: [
        {
            path: "/dashboard/settings",
            name: "Settings",
            component: () => import("../views/Settings.vue"),
        },
        {
            path: "/dashboard/orders",
            name: "Orders",
            component: () => import("../views/OrderView.vue"),
        },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to check if the user is authenticated
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    // Check if the route requires authentication
    if (requiresAuth) {
      // Check if clientId and clientToken exist in localStorage
      const clientId = localStorage.getItem("clientId");
      const clientToken = localStorage.getItem("clientToken");

      if (!clientId || !clientToken) {
        // If either clientId or clientToken is missing, redirect to the login page
        next({ name: "Login" });
      } else {
        // If both clientId and clientToken exist, proceed with the navigation
        next();
      }
    } else {
      // If the route doesn't require authentication, proceed with the navigation
      next();
    }
  });

export default router;