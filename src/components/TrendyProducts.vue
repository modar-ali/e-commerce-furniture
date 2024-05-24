<template>
  <div class="trendy-products">
    <h2 class="section-title">Trendy Products</h2>
    <div class="products-grid">
      <div class="product" v-for="product of products" :key="product.id">
        <img
          class="product__img"
          :src="getImageUrl(product.image)"
          :alt="product.name"
        />
        <div class="product__content">
          <h3 class="product__title">{{ product.name }}</h3>
          <p class="product__price">{{ product.price - product.discount }}</p>
        </div>
      </div>
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
        >arrow_forward</span>
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
  return store.getters["trendyProducts/getTrendyProducts"]
})
const currentPage = ref(store.getters["trendyProducts/getCurrentPage"])
const lastPage = computed(() => {
  return store.getters["trendyProducts/getLastPage"]
})
const hasMorePages = computed(() => {
  return store.getters["trendyProducts/hasMorePages"]
})
const baseURL = ref(import.meta.env.VITE_BASE_URL)

// Define Methods :
const nextPage = () => {
  if (hasMorePages.value) {
    store.dispatch("trendyProducts/fetchTrendyProducts", currentPage.value + 1)
    currentPage.value++
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    store.dispatch("trendyProducts/fetchTrendyProducts", currentPage.value - 1)
    currentPage.value--
  }
}

const getImageUrl = (imagePath) => {
  return `${baseURL.value}${imagePath}`
}

watchEffect(async () => {
  await store.dispatch("trendyProducts/fetchTrendyProducts", currentPage.value)
})
</script>

<style scoped>
.trendy-products {
  margin-bottom: 50px;
}

.section-title {
  width: fit-content;
  margin-inline: auto;
  font-size: 2rem;
  font-weight: var(--fw-black);
  color: var(--primary-clr-400);
  margin-bottom: 1.5625rem;
}

.products-grid {
  display: grid;
  gap: 2.5rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.product {
  position: relative;
}

.product:hover .product__content {
  opacity: 1;
}

.product__img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.product__content {
  position: absolute;
  display: grid;
  gap: 0.625rem;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--opacity-clr-1000);
  width: 100%;
  padding: 0.75rem 0.625rem 0;
  text-align: center;
  opacity: 0;
  transition: 0.3s;
}

.product__title {
  font-size: 1.3125rem;
  line-height: 1;
  color: var(--primary-clr-400);
}

.product__price {
  font-size: 2rem;
  width: max-content;
  margin-inline: auto;
  color: var(--primary-font-clr-100);
  position: relative;
}

.product__price::after {
  content: "SYP";
  position: absolute;
  font-size: 1rem;
  font-weight: var(--fw-bold);
  top: 0;
  right: -25%;
}

.navigation-arrows {
  margin-top: 25px;
  display: flex;
  justify-content: space-around;
}

.navigation-arrows > * {
  cursor: pointer;
  padding: 0.3125rem;
  font-size: 30px;
  font-weight: var(--fw-bold);
  border-radius: 50%;
  background-color: var(--primary-clr-400);
  color: var(--primary-clr-1000);
}

.navigation-arrows .disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
