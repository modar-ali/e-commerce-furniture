<template>
  <div class="container">
    <div class="tab-bar">
      <h2
        :class="{ 'active-bar': activeBar === 'catagories' }"
        @click="activeBar = 'catagories'"
        class="catagories"
      >
        Catagories
      </h2>
      <h2
        :class="{ 'active-bar': activeBar === 'products' }"
        @click="activeBar = 'products'"
        class="products"
      >
        Products
      </h2>
    </div>
    <CatagoriesScroller v-if="activeBar === 'catagories'" />
    <ProductsScroller v-if="activeBar === 'products'" />
  </div>
</template>

<script setup>
import { ref } from "vue"
import CatagoriesScroller from "./CatagoriesScroller.vue"
import ProductsScroller from "./ProductsScroller.vue"

const activeBar = ref("catagories")
</script>

<style scoped>
.tab-bar {
  display: flex;
  gap: 2.5rem;
}

.tab-bar > * {
  cursor: pointer;
  font-size: var(--fs-16px);
  font-weight: var(--fw-bold);
  padding-block: 0.625rem;
  color: var(--secondary-clr-500);
}

.active-bar {
  color: var(--primary-clr-400);
  border-bottom: 3px solid var(--primary-clr-400);
}
</style>
