<template>
  <div class="container">
    <div class="page-center">
      <div class="single-product" :class="{ trendy: product.is_trendy }">
        <img
          class="single-product__img"
          :src="getImageUrl(product.image)"
          :alt="product.name"
        />
        <div class="single-product__content">
          <h2 class="single-product__title">{{ product.name }}</h2>
          <p class="single-product__details">{{ product.details }}</p>
          <div class="single-product__price">
            <div class="product-new-price">
              {{ product.price - product.discount }}
            </div>
            <div
              v-if="!Math.trunc(product.discount) == 0"
              class="product-old-price"
            >
              {{ Math.trunc(product.price) }}
            </div>
          </div>
          <span class="single-product__amount"
            >{{ product.amount }} pieces</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { useStore } from "vuex"

// Define Store :
const store = useStore()
const route = useRoute()

// Define Data :
const product = computed(() => {
  return store.getters["showProduct/getProduct"]
})

const baseURL = ref(import.meta.env.VITE_BASE_URL)

// Define Methods :
const fetchProduct = () => {
  store.dispatch(
    "showProduct/fetchProduct",
    `api/product/show/${route.params.id}`
  )
}

const getImageUrl = (imagePath) => {
  return `${baseURL.value}${imagePath}`
}

onMounted(() => {
  fetchProduct()
})
</script>

<style scoped>
.single-product {
  --content-padding: 0.9375rem;
  --content-spacing: 0.3125rem;
  display: grid;
  background-color: var(--secondary-clr-900);
  overflow: hidden;
}

@media (min-width: 767px) {
  .single-product {
    grid-template-columns: 1fr 1fr;
  }
}

.trendy {
  position: relative;
}

.trendy::after {
  content: "Trendy";
  position: absolute;
  top: 15px;
  left: -30px;
  font-weight: var(--fw-bold);
  width: 7rem;
  text-align: center;
  color: var(--primary-clr-1000);
  background-color: red;
  transform: rotate(-45deg);
}

.single-product__content {
  display: grid;
  gap: var(--content-spacing);
  padding: var(--content-padding);
}

@media (min-width: 767px) {
  .single-product__content {
    padding: 1.25rem;
    gap: 0.625rem;
    place-items: center;
  }
}

.single-product__title {
  font-size: 1.5rem;
  color: var(--primary-clr-400);
  line-height: 1.1;
}

@media (min-width: 767px) {
  .single-product__title {
    font-size: 1.875rem;
  }
}

.single-product__details {
  color: var(--secondary-clr-300);
}

@media (min-width: 767px) {
  .single-product__details {
    font-size: 1rem;
    line-height: 1.9;
  }
}

.single-product__price {
  display: flex;
  gap: 4rem;
  align-items: center;
}

.product-new-price {
  position: relative;
  font-size: 1.5rem;
  font-weight: var(--fw-bold);
  color: var(--primary-clr-400);
}

.product-new-price::after {
  content: "SYP";
  position: absolute;
  font-size: 14px;
  top: 0;
  right: 0;
  transform: translateX(100%);
}

@media (min-width: 767px) {
  .product-new-price {
    font-size: 2rem;
  }
}

.product-old-price::before {
  content: "SYP";
  position: absolute;
  font-size: 12px;
  font-weight: var(--fw-bold);
  top: 0%;
  right: 0;
  transform: translateX(100%);
}

.product-old-price {
  position: relative;
  font-size: 1.2rem;
  color: var(--secondary-clr-300);
}

@media (min-width: 767px) {
  .product-old-price {
    font-size: 1.5625rem;
  }
}

.product-old-price::after {
  content: "";
  width: 100%;
  height: 2px;
  background-color: var(--secondary-clr-300);
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

.single-product__amount {
  margin-left: auto;
  width: fit-content;
  padding: 0.3125rem 0.625rem;
  border-radius: 1.25rem;
  font-weight: var(--fw-bold);
  background-color: var(--primary-clr-400);
  color: var(--primary-clr-1000);
}
</style>
