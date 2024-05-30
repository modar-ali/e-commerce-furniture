<template>
  <div class="container">
    <div class="searched-products">
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
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watchEffect } from "vue"
import { useRoute } from "vue-router"
import { useStore } from "vuex"

// Define Store & Route :
const store = useStore()
const route = useRoute()

// Define Data :
const products = computed(() => {
  return store.getters["searchedProducts/getProducts"]
})

const baseURL = ref(import.meta.env.VITE_BASE_URL)

// Define Methods :
watchEffect(() => {
  store.dispatch("searchedProducts/fetchSearchData", route.params.name)
})

const getImageUrl = (imagePath) => {
  return `${baseURL.value}${imagePath}`
}
</script>

<style scoped>
.searched-products {
  margin-block: 50px;
}
</style>
