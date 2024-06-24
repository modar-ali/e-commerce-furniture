<template>
  <div class="container">
    <div class="status-pop-up" v-if="updateRespons.status === 'success'">
      <div class="pop-up-info">
        <div class="check-icon">
          <span class="material-symbols-outlined">check</span>
        </div>
        <p class="status-text">{{ updateRespons.message }}</p>
      </div>
      <span class="close-icon" @click="updateRespons.status = ''">close</span>
    </div>
    <div class="status-pop-up" v-if="showDialog" :class="{ error: showDialog }">
      <div class="pop-up-info">
        <div class="error-icon">
          <span class="material-symbols-outlined">error</span>
        </div>
        <p class="status-text">Wrong quantity . !</p>
      </div>
      <span
        class="close-icon"
        :class="{ 'close-error': showDialog }"
        @click="showDialog = false"
        >close</span
      >
    </div>
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
        <div class="item__right-side">
          <span
            @click="removeFromCart(item.product_id)"
            class="delete-icon material-symbols-outlined"
            >delete</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useStore } from "vuex"

// Define Store :
const store = useStore()

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

onMounted(() => {
  fetchUserCart()
})
</script>

<style scoped>
.container {
  position: relative;
  height: calc(100vh - 80px);
}

.status-pop-up {
  display: grid;
  gap: 0.3125rem;
  background-color: var(--primary-clr-1000);
  box-shadow: 0 0 10px 0px var(--primary-clr-400);
  padding: 0.625rem;
  border-radius: 0.3125rem;
  position: fixed;
  z-index: 100;
  left: 50%;
  transform: translateX(-50%);
}

.pop-up-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
}

.error {
  box-shadow: 0 0 10px 0px hsl(0, 92%, 66%);
}

.check-icon,
.error-icon {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--primary-clr-400);
}

.error-icon {
  background-color: hsl(0, 92%, 66%);
}

.check-icon > *,
.error-icon > * {
  color: var(--primary-clr-1000);
}

.status-text {
  font-size: 1.125rem;
  font-weight: var(--fw-bold);
}

.close-icon {
  cursor: pointer;
  background-color: var(--primary-clr-400);
  color: var(--primary-clr-1000);
  display: block;
  width: fit-content;
  padding-inline: 0.625rem;
  margin-inline: auto;
  border-radius: 1.25rem;
  font-weight: var(--fw-bold);
}

.close-error {
  background-color: hsl(0, 92%, 66%);
}

.all-items {
  display: grid;
  gap: 0.625rem;
}

.item {
  background-color: var(--primary-clr-1000);
  border: 1px solid var(--secondary-clr-700);
  padding: 0.3125rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item__left-side {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.item__img {
  width: 100px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.item__info {
  display: grid;
  gap: 0.3125rem;
}

.item__name {
  width: 20ch;
  position: relative;
  font-weight: bold;
  font-size: 1.125rem;
  color: var(--primary-font-clr-100);
  transition: 0.3s;
}

.item__name:hover {
  color: var(--primary-clr-400);
}

.item__quantity,
.item__price {
  color: var(--primary-clr-400);
  font-weight: var(--fw-bold);
}

.item__middle-side {
  display: grid;
  align-items: center;
  gap: 0.3125rem;
}

.manage-update {
  display: flex;
  align-items: center;
  gap: 0.3125rem;
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
  font-weight: var(--fw-bold);
  background-color: var(--primary-clr-400);
  color: var(--primary-clr-1000);
  padding-block: 0.3125rem;
  border: none;
  border-radius: 1.25rem;
}

.delete-icon {
  cursor: pointer;
  color: var(--primary-font-clr-1000);
  background-color: var(--primary-clr-400);
  padding: 0.3125rem;
  border-radius: 50%;
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
</style>
