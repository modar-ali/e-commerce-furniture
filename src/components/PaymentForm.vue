<template>
  <Popup
    v-if="makePaymentRes.status === 'success'"
    :popup-msg="makePaymentRes.message"
  />
  <div class="form-overlay">
    <div class="make-payment">
      <span @click="$emit('close')" class="close-icon material-symbols-outlined"
        >close</span
      >
      <h2 class="form-title">Make Payment</h2>
      <form class="payment-form" @submit.prevent="makePayment">
        <div class="phone-number">
          <input
            type="text"
            placeholder="phone number *"
            v-model="paymentData.phoneNumber"
          />
          <span
            class="errMsg"
            v-for="error in v$.phoneNumber.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}</span
          >
        </div>
        <div class="process-number">
          <input
            type="text"
            placeholder="process number *"
            v-model="paymentData.processNumber"
          />
          <span
            class="errMsg"
            v-for="error in v$.processNumber.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}</span
          >
        </div>
        <button class="make-payment-btn">Make payment</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import useVuelidate from "@vuelidate/core"
import { required } from "@vuelidate/validators"
import { computed, ref } from "vue"
import { useStore } from "vuex"
import Popup from "./Popup.vue"

// Define Store :
const store = useStore()

// Define Data :
const props = defineProps({
  orderId: Number,
})

const emit = defineEmits(["close"])

const paymentData = ref({
  phoneNumber: null,
  processNumber: null,
})

const rules = computed(() => {
  return {
    phoneNumber: { required },
    processNumber: { required },
  }
})

const v$ = useVuelidate(rules, paymentData)

const makePaymentRes = computed(() => {
  return store.getters["orders/getMakePaymentRes"]
})
// Define Methods :
const fetchUserOrders = () => {
  store.dispatch("orders/fetchUserOrders")
}

const makePayment = async () => {
  let isFormValid = await v$.value.$validate()
  if (isFormValid) {
    await store.dispatch("orders/makePayment", {
      orderId: props.orderId,
      phoneNumber: paymentData.value.phoneNumber,
      processNumber: paymentData.value.processNumber,
    })
    emit("close")
  }
  fetchUserOrders()
}
</script>

<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: none;
}

.form-overlay {
  display: grid;
  place-items: center;
  height: calc(100vh - 70px);
  width: 100%;
  position: fixed;
  background-color: hsla(0, 0%, 100%, 0.9);
}

.make-payment {
  position: relative;
  display: grid;
  gap: 0.625rem;
  width: 500px;
  padding: 1.25rem;
  border-radius: 0.625rem;
  background-color: var(--primary-clr-1000);
  box-shadow: 0 0 5px 0 var(--secondary-clr-700);
}

.close-icon {
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 18px;
  padding: 0.3125rem;
  border-radius: 50%;
  transition: 0.3s;
}

.close-icon:hover {
  background-color: var(--secondary-clr-900);
}

.payment-form {
  display: grid;
  gap: 0.625rem;
}

.phone-number > input,
.process-number > input {
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

.make-payment-btn {
  cursor: pointer;
  background-color: var(--primary-clr-400);
  color: var(--primary-font-clr-1000);
  font-size: 1rem;
  font-weight: var(--fw-bold);
  padding-block: 0.3125rem;
  margin-top: 1.25rem;
  border: none;
  border-radius: 1.25rem;
}
</style>
