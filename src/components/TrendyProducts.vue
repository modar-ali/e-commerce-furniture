<template>
  <div class="trendy-products">
    <h2 class="section-title">Trendy Products</h2>
    <div class="products-grid">
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
    </div>
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
</script>

<style scoped>
.trendy-products {
  margin-bottom: 50px;
}
</style>
