<template>
  <div class="page-center">
    <div class="container">
      <div class="login-page">
        <div class="register-side">
          <h2>Don't have an account ?<br />Register now</h2>
          <p>Register or Login to know more<br />about our products.</p>
          <button @click="handleClick" class="register-btn">
            Create account
          </button>
        </div>
        <div class="login-side">
          <form @submit.prevent="handleLogin" class="login-form">
            <div class="field">
              <input
                type="text"
                placeholder="Email"
                v-model="loginData.email"
              />
              <span class="errMsg"></span>
            </div>
            <div class="feild">
              <div class="password">
                <input
                  :type="passwordVisible ? 'text' : 'password'"
                  placeholder="Password"
                  v-model="loginData.password"
                />
                <span
                  @click="toggleVisible"
                  v-if="!passwordVisible"
                  class="toggle material-symbols-outlined"
                  >visibility</span
                >
                <span
                  @click="toggleVisible"
                  v-if="passwordVisible"
                  class="toggle material-symbols-outlined"
                >
                  visibility_off
                </span>
              </div>
              <span class="errMsg"></span>
            </div>
            <button class="submit-login-btn">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import { ref } from "vue"

// Define the router & store :
const router = useRouter()
const store = useStore()

// Data :
const loginData = ref({
  email: "",
  password: "",
})

const passwordVisible = ref(false)

// methods :
const handleClick = () => {
  router.push({ name: "register" })
}

const handleLogin = async () => {
  await store.dispatch("auth/login", loginData.value)
  router.push({ name: "home" })
}

const toggleVisible = () => {
  passwordVisible.value = !passwordVisible.value
}
</script>

<style scoped></style>
