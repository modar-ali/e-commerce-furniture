<template>
  <Popup v-if="createRes.status === 'success'" :popup-msg="createRes.message" />
  <Popup v-if="deleteRes.status === 'success'" :popup-msg="deleteRes.message" />
  <Popup v-if="updateRes.status === 'success'" :popup-msg="updateRes.message" />
  <Popup
    v-if="placeOrderRes.status === 'success'"
    :popup-msg="placeOrderRes.message"
  />
  <LocationUpdateForm
    :location-id="id"
    @close="closeUpdateForm"
    v-if="showUpdateForm"
  />
  <PaymentForm
    @close="paymentFormShowed = false"
    v-if="paymentFormShowed"
    :orderId="orderId"
  />
  <div class="container">
    <div class="location">
      <div class="location__header">
        <span class="location__icon material-symbols-outlined"
          >location_on</span
        >
        <h1 class="location__title">Location</h1>
      </div>
      <form class="location__form" @submit.prevent="createLocation">
        <div class="location__inputs">
          <div class="location__city">
            <input type="text" placeholder="City *" v-model="location.city" />
            <span
              class="errMsg"
              v-for="error in v$.city.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}</span
            >
          </div>
          <div class="location__street">
            <input
              type="text"
              placeholder="Street *"
              v-model="location.street"
            />
            <span
              class="errMsg"
              v-for="error in v$.street.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}</span
            >
          </div>
          <div class="location__building">
            <input
              type="text"
              placeholder="Building *"
              v-model="location.building"
            />
            <span
              class="errMsg"
              v-for="error in v$.building.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}</span
            >
          </div>
        </div>
        <button class="create-location">Add location</button>
      </form>
      <div class="location__info" v-if="userLocations.locations">
        <h2 class="recent-locations">Recently added locations</h2>
        <div
          class="single-location"
          :class="{ 'active-location': radioLocation === location }"
          v-for="location in userLocations.locations"
          :key="location.id"
        >
          <div class="radio-and-info">
            <input
              type="radio"
              class="location-radio"
              :value="location"
              v-model="radioLocation"
            />
            <div class="single-location__info">
              <p class="city">{{ location.city }} city,</p>
              <p class="street">{{ location.street }} street,</p>
              <p class="building">Building number {{ location.building }}</p>
            </div>
          </div>
          <div class="edit-and-delete">
            <button class="edit-location" @click="editLocation(location.id)">
              <span class="edit-icon material-symbols-outlined"
                >border_color</span
              >
              <p class="edit-text">Edit</p>
            </button>
            <button
              class="delete-location"
              @click="deleteLocation(location.id)"
            >
              <span class="delete-icon material-symbols-outlined">delete</span>
              <p class="delete-text">Delete</p>
            </button>
          </div>
        </div>
      </div>
      <div class="choose-date">
        <h2 class="choose-date__title">Date of delivery</h2>
        <VueDatePicker
          placeholder="Choose a date"
          v-model="date"
        ></VueDatePicker>
      </div>
      <button @click="plcaeOrder" class="place-order">Place order</button>
    </div>
    <div class="order-summary">
      <AllOrders @show="showPaymentForm" />
    </div>
  </div>
</template>

<script setup>
import Popup from "../components/Popup.vue"
import LocationUpdateForm from "../components/LocationUpdateForm.vue"
import useVuelidate from "@vuelidate/core"
import { required } from "@vuelidate/validators"
import { computed, onMounted, ref } from "vue"
import { useStore } from "vuex"
import VueDatePicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"
import AllOrders from "../components/AllOrders.vue"
import PaymentForm from "@/components/PaymentForm.vue"

// Define Store:
const store = useStore()

// Define Data :
const location = ref({
  city: "",
  street: "",
  building: "",
})

const id = ref(0)
const showUpdateForm = ref(false)
const date = ref()
const paymentFormShowed = ref(false)
const orderId = ref(0)

const rules = computed(() => {
  return {
    city: { required },
    street: { required },
    building: { required },
  }
})

const v$ = useVuelidate(rules, location)

const createRes = computed(() => {
  return store.getters["locations/getCreateRes"]
})

const userLocations = computed(() => {
  return store.getters["locations/getUserLocations"]
})

const deleteRes = computed(() => {
  return store.getters["locations/getDeleteRes"]
})

const updateRes = computed(() => {
  return store.getters["locations/getUpdateRes"]
})

const placeOrderRes = computed(() => {
  return store.getters["orders/getPlaceOrderRes"]
})

const radioLocation = ref({
  id: 0,
  city: "",
  street: "",
  building: "32",
  user_id: 0,
})

// Define Methods :
const fetchUserLocations = async () => {
  await store.dispatch("locations/fetchUserLocations")
}

const createLocation = async () => {
  let isFormValid = await v$.value.$validate()
  if (isFormValid) {
    await store.dispatch("locations/createLocation", location.value)
    fetchUserLocations()
    location.value = {}
  }
}

const deleteLocation = async (locationId) => {
  await store.dispatch("locations/deleteLocation", locationId)
  fetchUserLocations()
}

const editLocation = (locationId) => {
  id.value = locationId
  showUpdateForm.value = true
}

const fetchUserOrders = () => {
  store.dispatch("orders/fetchUserOrders")
}

const plcaeOrder = () => {
  store.dispatch("orders/placeOrder", {
    locationId: radioLocation.value.id,
    dateOfDelivery: date.value,
  })
  fetchUserOrders()
}

const closeUpdateForm = () => {
  showUpdateForm.value = false
}

const showPaymentForm = (n) => {
  orderId.value = n
  paymentFormShowed.value = true
}

onMounted(() => {
  fetchUserLocations()
})
</script>

<style scoped>
.container {
  display: flex;
  gap: 1.25rem;
}

.location {
  flex-basis: 70%;
  height: fit-content;
  display: grid;
  gap: 1.875rem;
  border-radius: 1.25rem;
  box-shadow: 0 0 0 2px var(--secondary-clr-900);
  padding: 1.875rem;
}

.order-summary {
  flex-basis: 30%;
  border-radius: 1.25rem;
  box-shadow: 0 0 0 2px var(--secondary-clr-900);
  padding: 1.875rem;
}

.location__header {
  width: fit-content;
  border-bottom: 3px solid var(--primary-clr-400);
  display: flex;
  align-items: center;
  gap: 0.3125rem;
}

.location__icon {
  font-size: 1.75rem;
}

.location__form {
  display: grid;
  gap: 1.875rem;
}

.location__inputs {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.location__inputs > * {
  flex-basis: 100%;
  height: 60px;
}

.location__city > input,
.location__street > input,
.location__building > input {
  width: 100%;
  padding: 0.625rem 0;
  border: none;
  border-bottom: 1px solid var(--secondary-clr-700);
  outline: none;
  background-color: transparent;
}

.errMsg {
  display: block;
  color: hsl(0, 100%, 50%);
  font-size: 0.75rem;
  font-weight: var(--fw-bold);
}

.create-location {
  cursor: pointer;
  width: 150px;
  border: none;
  border-radius: 1.875rem;
  padding-block: 0.3125rem;
  margin-inline: auto 0;
  font-size: 1rem;
  font-weight: var(--fw-bold);
  background-color: var(--primary-clr-400);
  color: var(--primary-clr-1000);
}

.location__info {
  display: grid;
  gap: 1.875rem;
}

.recent-locations {
  width: fit-content;
  border-bottom: 3px solid var(--primary-clr-400);
}

.single-location {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid var(--secondary-clr-900);
  border-radius: 1.25rem;
  padding: 1.25rem;
  border-bottom: 2px solid var(--secondary-clr-900);
}

.active-location {
  background-color: var(--secondary-clr-900);
}

.radio-and-info {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.location-radio {
  width: 16px;
  height: 16px;
}

.single-location__info {
  display: flex;
  align-items: center;
  gap: 0.3125rem;
  font-size: 1rem;
  font-weight: var(--fw-bold);
  color: var(--secondary-clr-300);
}

.edit-and-delete {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.edit-location,
.delete-location {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3125rem;
  padding: 0.3125rem 0.625rem;
  border: none;
  border-radius: 1.25rem;
  background-color: var(--primary-clr-400);
  color: var(--primary-clr-1000);
}

.edit-icon,
.delete-icon {
  font-size: 16px;
}

.edit-text,
.delete-text {
  font-weight: var(--fw-bold);
}

.choose-date {
  display: grid;
  gap: 1.875rem;
}

.choose-date__title {
  width: fit-content;
  border-bottom: 3px solid var(--primary-clr-400);
}

.place-order {
  cursor: pointer;
  padding-block: 0.625rem;
  font-weight: var(--fw-bold);
  font-size: 1.125rem;
  border: none;
  border-radius: 2.5rem;
  background-color: var(--primary-clr-400);
  color: var(--primary-font-clr-1000);
}
</style>
