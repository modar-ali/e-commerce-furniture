<template>
  <div class="container">
    <div class="order">
      <div
        class="order-item"
        v-for="item of userSingleOrder.items"
        :key="item.id"
      >
        <img
          class="product-img"
          :src="getImageUrl(item.product.image)"
          :alt="item.product.name"
        />
        <div class="product-info">
          <p class="product-name">{{ item.product.name }}</p>
          <p class="product-price">
            {{ item.product.price - item.product.discount }} SYP
          </p>
          <p class="product-quantity">{{ item.quantity }} pieces ordered</p>
        </div>
      </div>
    </div>
    <!-- <div class="order-over-view">
      <div class="order-info">
        <p class="date">
          {{ extractDateAndTime(userSingleOrder.date_of_delivery) }} to deliver
        </p>
        <p class="status">{{ userSingleOrder.status }} order</p>
        <p class="total-price">
          {{ userSingleOrder.total_price }} SYR total price
        </p>
      </div>
      <div class="order-location">
        <p class="city">{{ location.city }} city</p>
        <p class="city">{{ userSingleOrder.location.street }} street</p>
        <p class="city">
          Building number {{ userSingleOrder.location.building }}
        </p>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import { useStore } from "vuex"

// Define Store & Route :
const store = useStore()
const route = useRoute()

// Define Data :
const userSingleOrder = computed(() => {
  return store.getters["orders/getUserSingleOrder"]
})

const baseURL = ref(import.meta.env.VITE_BASE_URL)
// Define Methods :
const fetchUserSingleOrder = () => {
  store.dispatch("orders/fetchUserSingleOrder", route.params.id)
}

const getImageUrl = (imagePath) => {
  return `${baseURL.value}${imagePath}`
}

const extractDateAndTime = (date) => {
  const dateObj = new Date(date)
  const isoString = dateObj.toISOString()
  const datePart = isoString.split("T")[0]
  const timePart = isoString.split("T")[1].split(".")[0]
  return `${datePart} ${timePart}`
}

onMounted(() => {
  fetchUserSingleOrder()
})
</script>

<style scoped>
.container {
  display: flex;
  gap: 1.25rem;
}

.order-info,
.order-location {
  display: grid;
  gap: 0.625rem;
}

.order {
  flex-basis: 70%;
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.order-item {
  background-color: var(--secondary-clr-900);
  display: grid;
  gap: 0.625rem;
  padding: 1.25rem;
}

.product-img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.product-info {
  display: grid;
  gap: 0.3125rem;
}

.product-name {
  color: var(--primary-clr-400);
  font-size: 1rem;
  font-weight: var(--fw-bold);
}

.product-price,
.product-quantity {
  font-size: 1rem;
  font-weight: var(--fw-bold);
}

.order-over-view {
  /* flex-basis: 30%; */
  background-color: var(--secondary-clr-900);
  padding: 1.25rem;
  display: grid;
  gap: 1rem;
}

.order-over-view > * {
  font-weight: var(--fw-bold);
}
</style>
