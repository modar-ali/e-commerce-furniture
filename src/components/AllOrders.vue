<template>
  <Popup
    v-if="deleteOrderRes.status === 'success'"
    :popup-msg="deleteOrderRes.message"
  />
  <h2 class="order-summary__title">Order summary</h2>
  <div class="all-orders" v-if="userOrders.orders !== 'No orders'">
    <div class="single-order" v-for="order of userOrders.orders">
      <div class="single-order__delivery-date">
        <p>Date & Time</p>
        <p>{{ extractDateAndTime(order.date_of_delivery) }}</p>
      </div>
      <div class="single-order__total-price">
        <p>Total Price</p>
        <p>{{ order.total_price }} SYP</p>
      </div>
      <div class="single-order__status">
        <p>Status</p>
        <p>{{ order.status }}</p>
      </div>
      <div class="set-of-btns">
        <button class="Delete" @click="deleteOrder(order.id)">Delete</button>
        <button class="pay-for-order" @click="$emit('show', order.id)">
          Pay
        </button>
        <button class="view-details" @click="viewDetails(order.id)">
          Details
        </button>
      </div>
    </div>
  </div>
  <div class="no-orders" v-else>
    <p>No orders now !</p>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import Popup from "./Popup.vue"

// Define Store & Router :
const store = useStore()
const router = useRouter()
const emit = defineEmits(["show"])

// Define Data :
const userOrders = computed(() => {
  return store.getters["orders/getUserOrdersRes"]
})

const deleteOrderRes = computed(() => {
  return store.getters["orders/getDeleteOrderRes"]
})

// Define Methods :
const fetchUserOrders = () => {
  store.dispatch("orders/fetchUserOrders")
}

const extractDateAndTime = (date) => {
  const dateObj = new Date(date)
  const isoString = dateObj.toISOString()
  const datePart = isoString.split("T")[0]
  const timePart = isoString.split("T")[1].split(".")[0]
  return `${datePart} ${timePart}`
}

const deleteOrder = (orderId) => {
  store.dispatch("orders/deleteOrder", orderId)
  fetchUserOrders()
}

const viewDetails = (orderId) => {
  router.push({ name: "order", params: { id: orderId } })
}

onMounted(() => {
  fetchUserOrders()
})
</script>

<style scoped>
.order-summary__title {
  width: fit-content;
  margin-bottom: 1.875rem;
  border-bottom: 3px solid var(--primary-clr-400);
}

.all-orders {
  display: grid;
  gap: 1.25rem;
}

.single-order {
  display: grid;
  gap: 0.3125rem;
}

.single-order:not(:last-child) {
  padding-bottom: 1.25rem;
  border-bottom: 2px solid var(--secondary-clr-900);
}

.single-order__delivery-date,
.single-order__total-price,
.single-order__status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: var(--fw-bold);
}

.set-of-btns {
  display: flex;
  align-items: center;
  gap: 0.3125rem;
  margin-top: 0.3125rem;
}

.Delete,
.pay-for-order,
.view-details {
  flex-basis: 100%;
  cursor: pointer;
  border: none;
  font-weight: bold;
  padding-block: 0.3125rem;
  border-radius: 1.25rem;
  color: var(--primary-font-clr-1000);
  background-color: var(--primary-clr-400);
}

.no-orders {
  height: 90%;
  display: grid;
  place-items: center;
  font-size: 1.5rem;
  font-weight: var(--fw-bold);
  color: var(--secondary-clr-500);
}
</style>
