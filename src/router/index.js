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
    {
      path: "/categories/:id",
      name: "category-product",
      component: () => import("../components/CategoryProduct.vue"),
    },
    {
      path: "/product/:id",
      name: "product",
      component: () => import("../components/SingleProduct.vue"),
    },
  ],
})

export default router
