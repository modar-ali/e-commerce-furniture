<template>
  <div class="trendy-products">
    <h2 class="section-title">Trendy Products</h2>
    <TransitionGroup
      tag="div"
      class="products-grid"
      appear
      @before-enter="onBeforeEnter"
      @enter="onEnter"
    >
      <RouterLink
        :to="{ name: 'product', params: { id: product.id } }"
        class="product"
        v-for="product of products"
        :key="product.id"
      >
        <img
          class="product__img"
          :src="getImageUrl(product.image)"
          :alt="product.name"
        />
        <div class="product__content">
          <h3 class="product__title">{{ product.name }}</h3>
          <p class="product__price">{{ product.price - product.discount }}</p>
        </div>
      </RouterLink>
    </TransitionGroup>
    <div class="navigation-arrows">
      <span
        @click="previousPage"
        :class="{ disabled: currentPage === 1 }"
        class="material-symbols-outlined"
        >arrow_back</span
      >
      <span
        @click="nextPage"
        :class="{ disabled: !hasMorePages }"
        class="material-symbols-outlined"
        >arrow_forward</span
      >
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from "vue"
import { useStore } from "vuex"
import gsap from "gsap"

// Define Store :
const store = useStore()

// Define Data :
const products = computed(() => {
  return store.getters["productsPagination/getProducts"]
})
const currentPage = ref(store.getters["productsPagination/getCurrentPage"])

const hasMorePages = computed(() => {
  return store.getters["productsPagination/hasMorePages"]
})
const baseURL = ref(import.meta.env.VITE_BASE_URL)

// Define Methods :
const nextPage = () => {
  if (hasMorePages.value) {
    store.dispatch(
      "productsPagination/fetchProducts",
      `api/product/trendy?page=${currentPage.value + 1}`
    )
    currentPage.value++
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    store.dispatch(
      "productsPagination/fetchProducts",
      `api/product/trendy?page=${currentPage.value - 1}`
    )
    currentPage.value--
  }
}

const getImageUrl = (imagePath) => {
  return `${baseURL.value}${imagePath}`
}

watchEffect(async () => {
  await store.dispatch(
    "productsPagination/fetchProducts",
    `api/product/trendy?page=${currentPage.value}`
  )
})

const onBeforeEnter = (el) => {
  el.style.opacity = 0
  el.style.transform = "translateX(100px)"
}

const onEnter = (el) => {
  gsap.to(el, {
    x: 0,
    opacity: 1,
    duration: 0.5,
  })
}
</script>

<style scoped>
.trendy-products {
  margin-bottom: 50px;
}
</style>
