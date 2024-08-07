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
      path: "/cart",
      name: "cart",
      component: () => import("../views/Cart.vue"),
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
    {
      path: "/search/product/:name",
      name: "searched-products",
      component: () => import("../components/SearchedProducts.vue"),
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("../views/Checkout.vue"),
    },
    {
      path: "/order/:id",
      name: "order",
      component: () => import("../views/Order.vue"),
    },
  ],
})

export default router
