<template>
  <div class="container">
    <div class="register-page">
      <div class="login-side">
        <h2>Create account</h2>
        <p>Already have an account ?</p>
        <button @click="handleClick" class="login-btn">Login</button>
      </div>
      <div class="register-side">
        <form class="register-form" @submit.prevent="handleRegister">
          <div class="field">
            <input type="text" placeholder="Name" v-model="registerData.name" />
            <span
              class="errMsg"
              v-for="error of v$.name.$errors"
              :key="error.$uid"
              >{{ error.$message }}</span
            >
          </div>
          <div class="field">
            <input
              type="text"
              placeholder="Email"
              v-model="registerData.email"
            />
            <span
              class="errMsg"
              v-for="error of v$.email.$errors"
              :key="error.$uid"
              >{{ error.$message }}</span
            >
          </div>
          <div class="field">
            <div class="password">
              <input
                :type="passwordVisible ? 'text' : 'password'"
                placeholder="Password"
                v-model="registerData.password"
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
            <span
              class="errMsg"
              v-for="error of v$.password.$errors"
              :key="error.$uid"
              >{{ error.$message }}</span
            >
          </div>
          <div class="field">
            <input
              type="password"
              placeholder="Confirme password"
              v-model="registerData.password_confirmation"
            />
            <span
              class="errMsg"
              v-for="error of v$.password_confirmation.$errors"
              :key="error.$uid"
              >{{ error.$message }}</span
            >
          </div>
          <div class="field">
            <div class="privacy-policy">
              <input type="checkbox" v-model="registerData.terms" />
              <label class="privacy-label">
                I have read and understood the <span>privacy policy.</span>
              </label>
            </div>
            <span
              class="errMsg"
              v-for="error of v$.terms.$errors"
              :key="error.$uid"
              >{{ error.$message }}</span
            >
          </div>
          <button
            class="submit-register-btn"
            
          >
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue"
import { useRouter } from "vue-router"
import useVuelidate from "@vuelidate/core"
import {
  required,
  email,
  minLength,
  sameAs,
  helpers,
} from "@vuelidate/validators"
import { passwordErr, password } from "@/services/custom-validators/password"
import { checkedErr, checked } from "@/services/custom-validators/checked"
import { useStore } from "vuex"

// Define the router & store :
const router = useRouter()
const store = useStore()

// Data :
const registerData = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  terms: false,
})
const passwordVisible = ref(false)

const rules = computed(() => {
  return {
    name: { required, minLength: minLength(6) },
    email: { required, email },
    password: {
      required,
      password: helpers.withMessage(passwordErr, password),
    },
    password_confirmation: {
      required,
      sameAs: sameAs(registerData.value.password),
    },
    terms: {
      checked: helpers.withMessage(checkedErr, checked),
    },
  }
})

const v$ = useVuelidate(rules, registerData)

// Methods :
const handleRegister = async () => {
  const isFormValid = await v$.value.$validate()
  if (isFormValid) {
    await store.dispatch("auth/register", registerData.value)
    router.push({ name: "verify-email" })
  }
}

const handleClick = () => {
  router.push({ name: "login" })
}

const toggleVisible = () => {
  passwordVisible.value = !passwordVisible.value
}
</script>

<style scoped>
.privacy-label {
  color: var(--secondary-clr-300);
}

.privacy-label span {
  cursor: pointer;
  font-weight: var(--fw-bold);
  color: var(--primary-clr-400);
}
</style>
