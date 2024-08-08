<template>
  <div class="container">
    <Popup
      v-if="updateRespons.status === 'success'"
      :popup-msg="updateRespons.message"
    />
    <Popup v-if="showDialog" :popup-msg="'Wrong quantity !!!'" />
    <div class="all-items">
      <div class="no-items" v-if="userCart.message">
        <img
          class="no-items__img"
          src="../assets/images/vecteezy_box-empty-state-single-isolated-icon-with-flat-style_11537753.jpg"
          alt=""
        />
        <h2 class="no-items__text">{{ userCart.message }} . !</h2>
      </div>
      <div class="item" v-for="item in userCart.items" :key="item.id" v-else>
        <div class="item__left-side">
          <img
            :src="getImageUrl(item.product.image)"
            :alt="item.product.name"
            class="item__img"
          />
          <div class="item__info">
            <RouterLink
              class="item__name"
              :to="{ name: 'product', params: { id: item.product.id } }"
              >{{ item.product.name }}</RouterLink
            >
            <p class="item__quantity">Quantity : {{ item.quantity }}</p>
            <p class="item__price">
              Final price :
              {{ item.product.price - item.product.discount }}
              SYP
            </p>
          </div>
        </div>
        <div class="item__middle-side">
          <div class="manage-update">
            <button class="decrease-button" @click="item.quantity--">
              <span class="material-symbols-outlined">remove</span>
            </button>
            <div class="updated-quantity">{{ item.quantity }}</div>
            <button class="increase-button" @click="item.quantity++">
              <span class="material-symbols-outlined">add</span>
            </button>
          </div>
          <button
            class="save-update"
            @click="updateCart(item.product_id, item.quantity)"
          >
            Save Changes
          </button>
        </div>
        <div class="item__right-side" @click="removeFromCart(item.product_id)">
          <span class="delete-icon material-symbols-outlined">delete</span>
          <p class="delete-text">Remove</p>
        </div>
      </div>
      <div class="total-price" v-if="!userCart.message">
        Total Price : {{ userCart.total_price }} SYP
      </div>
      <button class="checkout" @click="moveToCheckout" v-if="!userCart.message">
        Continue to checkout
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import Popup from "@/components/Popup.vue"

// Define Store & Router :
const store = useStore()
const router = useRouter()

// Define Data :
const userCart = computed(() => {
  return store.getters["cartManagement/getUserCart"]
})

const updateRespons = computed(() => {
  return store.getters["cartManagement/getUpdateResponse"]
})

const baseURL = ref(import.meta.env.VITE_BASE_URL)

const showDialog = ref(false)

// Define Methods :
const fetchUserCart = () => {
  store.dispatch("cartManagement/fetchUserCart")
}

const removeFromCart = (productId) => {
  store.dispatch("cartManagement/removeFromCart", {
    product_id: productId,
  })
  fetchUserCart()
}

const updateCart = (productId, quantity) => {
  if (quantity > 0) {
    store.dispatch("cartManagement/updateCart", {
      product_id: productId,
      quantity: quantity,
    })
  } else {
    showDialog.value = true
  }
}

const getImageUrl = (imagePath) => {
  return `${baseURL.value}${imagePath}`
}

const moveToCheckout = () => {
  router.push({ name: "checkout" })
}

onMounted(() => {
  fetchUserCart()
})
</script>

<style scoped>
.container {
  position: relative;
  min-height: calc(100vh - 80px);
}

.all-items {
  display: grid;
  gap: 1.875rem;
}

.item:first-child {
  padding-top: 1.875rem;
}

.item {
  background-color: var(--primary-clr-1000);
  border-bottom: 2px solid var(--secondary-clr-900);
  padding-bottom: 1.875rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item__left-side {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.item__img {
  width: 150px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.item__info {
  display: grid;
  gap: 1.25rem;
}

.item__name {
  width: 20ch;
  position: relative;
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--primary-font-clr-100);
  transition: 0.3s;
}

.item__name:hover {
  color: var(--primary-clr-400);
}

.item__quantity,
.item__price {
  font-size: 1rem;
  color: var(--primary-clr-400);
  font-weight: var(--fw-bold);
}

.item__middle-side {
  display: grid;
  align-items: center;
  gap: 0.625rem;
}

.manage-update {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.increase-button,
.decrease-button {
  display: grid;
  place-items: center;
  border: none;
  padding: 0.5rem;
  background-color: var(--primary-clr-400);
  color: var(--primary-clr-1000);
}

.increase-button {
  border-radius: 0 1.5rem 1.5rem 0;
}

.decrease-button {
  border-radius: 1.5rem 0 0 1.5rem;
}

.updated-quantity {
  font-size: 1rem;
  font-weight: var(--fw-bold);
  padding: 0.5rem 1rem;
  background-color: var(--secondary-clr-700);
  color: var(--primary-font-clr-100);
}

.save-update {
  font-size: 1rem;
  font-weight: var(--fw-bold);
  background-color: var(--primary-clr-400);
  color: var(--primary-clr-1000);
  padding-block: 0.3125rem;
  border: none;
  border-radius: 1.25rem;
}

.item__right-side {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3125rem;
  background-color: var(--primary-clr-400);
  padding: 0.3125rem 0.625rem;
  border-radius: 1.25rem;
}

.delete-icon {
  color: var(--primary-font-clr-1000);
}

.delete-text {
  color: var(--primary-clr-1000);
  font-weight: var(--fw-bold);
  font-size: 1rem;
}

.no-items {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
}

.no-items__img {
  width: 350px;
}

.no-items__text {
  color: var(--secondary-clr-500);
}

.total-price {
  margin-inline: auto;
  font-size: 1.5rem;
  font-weight: var(--fw-bold);
  color: var(--primary-font-clr-100);
}

.checkout {
  cursor: pointer;
  width: 25%;
  margin-inline: auto;
  padding-block: 0.625rem;
  font-size: 1.25rem;
  font-weight: var(--fw-bold);
  border: none;
  border-radius: 2rem;
  background-color: var(--primary-clr-400);
  color: var(--primary-clr-1000);
  margin-bottom: 1.875rem;
}
</style>
