import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/catagory",
      name: "catagory",
      component: () => import("../views/Catagory.vue"),
    },
    {
      path: "/contact-us",
      name: "contact-us",
      component: () => import("../views/ContactUs.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/verify-email",
      name: "verify-email",
      component: () => import("../views/VerifyEmail.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
  ],
})

export default router
