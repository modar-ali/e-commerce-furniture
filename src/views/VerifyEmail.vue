<template>
  <div
    class="verify-dialog"
    @click="goBackHome"
    v-if="verifyResponse.status === 'success'"
  >
    <div class="dialog-content">
      <div class="success-icon">
        <span class="material-symbols-outlined">verified</span>
      </div>
      <div class="success-text">
        <p class="success-message">{{ verifyResponse.message }}</p>
        <p class="close">Click anywhere to continue</p>
      </div>
    </div>
  </div>
  <div
    class="verify-dialog"
    @click="hideDialog"
    v-if="verifyResponse.status === 'failed'"
  >
    <div class="dialog-content">
      <div class="failed-icon">
        <span class="material-symbols-outlined">release_alert</span>
      </div>
      <div class="failed-text">
        <p class="failed-message">{{ verifyResponse.message }}</p>
        <p class="close">Click anywhere to continue and try again</p>
      </div>
    </div>
  </div>
  <div class="verify">
    <div class="verify-icon">
      <span class="material-symbols-outlined">verified_user</span>
    </div>
    <h2 class="verify-title">Verify it's you.</h2>
    <p class="verify-text">
      We sent verification code to <span class="bold">{{ getUser.email }}</span
      ><br />
      Please check your inbox and enter the code below.
    </p>
    <span class="verify-note">6 - digits code</span>
    <form @submit.prevent="sendCode" class="verify-form">
      <div class="verify-inputs">
        <input
          v-for="n of code.length"
          :key="n"
          type="text"
          min="0"
          max="9"
          v-model="code[n - 1]"
          @keyup="moveFocuse($event, n)"
        />
      </div>
      <button class="verify-btn" :class="{'not-allowed': status === 'loading'}" :disabled="status === 'loading'">Verify email</button>
    </form>
    <p class="verify-again">
      Didn't recevie an email?
      <span @click="resendCode" class="bold">Send it again.</span>
    </p>
  </div>
</template>

<script setup>
import api from "@/services/axios-service/api"
import { computed, ref } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

// Define Store & Router :
const router = useRouter()
const store = useStore()

// Data :
const code = ref(Array(6).fill(""))
const errorMsg = ref("")
const verifyResponse = ref({
  status: "",
  message: "",
})
const status = ref("")

// Methods :
const moveFocuse = (event, n) => {
  if (event.key >= 0 && event.key <= 9) {
    if (event.target.value.length === 1 && n < code.value.length) {
      const nextInput = event.target.form[n]
      if (nextInput) {
        nextInput.focus()
      }
    }
  } else if (event.key === "Backspace") {
    if (event.target.value.length === 0 && n > 1) {
      const previousInput = event.target.form[n - 2]
      if (previousInput) {
        previousInput.focus()
      }
    }
  }
}

const getUser = computed(() => {
  return store.getters["auth/getUser"]
})

const sendCode = async () => {
  status.value = "loading"
  try {
    const response = await api.post("api/auth/verify-user-email", {
      code: Number(code.value.join("")),
      email: getUser.value.email,
    })
    verifyResponse.value.status = response.data.status
    verifyResponse.value.message = response.data.message
    status.value = "success"
  } catch (err) {
    errorMsg.value = err.message
  }
}

const resendCode = async () => {
  try {
    const response = await api.post("api/auth/resend-email-verification-code", {
      email: getUser.value.email,
    })
  } catch (err) {
    errorMsg.value = err.message
  }
}

const goBackHome = () => {
  router.push({ name: "home" })
}

const hideDialog = () => {
  verifyResponse.value.status = "try again"
}
</script>
<style scoped>
.bold {
  font-weight: var(--fw-bold);
  color: var(--primary-clr-400);
}

.verify-dialog {
  display: grid;
  place-items: center;
  height: calc(100vh - 70px);
  width: 100%;
  position: fixed;
  background-color: hsla(0, 0%, 100%, 0.9);
}

.dialog-content {
  position: relative;
  padding: 2.5rem;
  border-radius: 0.625rem;
  background-color: var(--primary-clr-1000);
  box-shadow: 0 0 20px 0 hsla(0, 0%, 0%, 0.067);
}

.success-icon,
.failed-icon {
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translate(-50%, 100%);
  background-color: var(--primary-clr-400);
  width: 50px;
  height: 50px;
  display: grid;
  place-items: center;
  border-radius: 50%;
}

.success-icon > *,
.failed-icon > * {
  font-size: 1.875rem;
  color: var(--primary-font-clr-1000);
}

.success-text,
.failed-text {
  display: grid;
  gap: 1.25rem;
}

.success-message,
.failed-message {
  text-align: center;
  color: var(--secondary-clr-100);
  font-size: var(--fs-18px);
  font-weight: var(--fw-bold);
}

.close {
  width: fit-content;
  margin-inline: auto;
  color: var(--secondary-clr-500);
}

.verify {
  display: grid;
  gap: 1.25rem;
}

.verify-icon {
  display: grid;
  place-items: center;
  width: 125px;
  height: 125px;
  margin-inline: auto;
  background-color: var(--primary-clr-400);
  border-radius: 50%;
}

.verify-icon > * {
  display: block;
  font-size: 100px;
  color: var(--primary-font-clr-1000);
}

.verify-title {
  font-size: var(--fs-30px);
  color: var(--primary-font-clr-100);
  line-height: 1.1;
  letter-spacing: 1px;
  text-align: center;
}

.verify-text {
  max-width: 60ch;
  text-align: center;
  margin-inline: auto;
  color: var(--secondary-clr-300);
}

.verify-note {
  width: max-content;
  margin-inline: auto;
  display: block;
  font-weight: var(--fw-bold);
}

.verify-form {
  width: max-content;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.verify-inputs {
  display: flex;
  gap: 0.3125rem;
}

.verify-inputs > * {
  width: 45px;
  height: 45px;
  font-size: var(--fs-18px);
  font-weight: var(--fw-bold);
  outline: none;
  border: 1px solid var(--secondary-clr-700);
  border-radius: 6px;
  text-align: center;
  box-shadow: 0 0 1px var(--secondary-clr-500);
}

.verify-btn {
  cursor: pointer;
  width: 100%;
  border: none;
  padding-block: 0.625rem;
  border-radius: 1.25rem;
  font-weight: var(--fw-bold);
  color: var(--primary-font-clr-1000);
  background-color: var(--primary-clr-400);
}

.verify-again {
  cursor: pointer;
  text-align: center;
  color: var(--secondary-clr-500);
}

.not-allowed {
  cursor: not-allowed;
  opacity: 0.65;
}
</style>
