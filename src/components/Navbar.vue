<template>
  <div class="container">
    <div class="nav">
      <div class="nav_logo_search align">
        <div class="logo center">Logo</div>
        <SearchBar />
      </div>
      <ul class="nav_icons align">
        <li class="center">
          <span class="icone material-symbols-outlined">shopping_cart</span>
        </li>
        <!-- <li class="center">
          <span class="icone material-symbols-outlined">account_circle</span>
        </li> -->
        <li class="center" v-if="!isLoggedIn">
          <router-link :to="{ name: 'login' }">
            <div class="login align">
              <span>Login</span>
              <span class="material-symbols-outlined">login</span>
            </div>
          </router-link>
        </li>
        <li class="align" @click="handleLogout" v-if="isLoggedIn">
          <div class="logout">
            <span>Logout</span>
            <span class="material-symbols-outlined">logout</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import SearchBar from "./SearchBar.vue"
import { computed } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"

const store = useStore()
const router = useRouter()

const isLoggedIn = computed(() => {
  return store.getters["auth/isLoggedIn"]
})

const handleLogout = async () => {
  await store.dispatch("auth/logout")
  router.push({ name: "login" })
}
</script>

<style scoped>
.center {
  display: grid;
  place-items: center;
}

.align {
  display: flex;
  align-items: center;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav_logo_search {
  flex-basis: 80%;
  gap: 1.875rem;
}

@media (max-width: 767px) {
  .nav_logo_search {
    gap: 0.625rem;
  }
}

.logo {
  color: var(--primary-clr-400);
  font-size: var(--fs-20px);
  font-weight: var(--fw-bold);
  min-height: 70px;
}

.nav_logo_search > form {
  flex-basis: 100%;
}

.nav_icons {
  flex-basis: auto;
  justify-content: flex-end;
}

.nav_icons > * {
  cursor: pointer;
  padding-inline: 0.9375rem;
  min-height: 70px;
}

@media (max-width: 767px) {
  .nav_icons > * {
    padding-inline: 0.3125rem;
  }
}

.icone {
  color: var(--primary-font-clr-100);
  transition: background-color 0.25s;
}

@media (max-width: 767px) {
  .icone {
    font-size: 20px;
  }
}

.icone:hover {
  color: var(--primary-clr-400);
}

.login,
.logout {
  display: flex;
  align-items: center;
  color: var(--primary-font-clr-1000);
  background-color: var(--primary-clr-400);
  padding: 0.3125rem 0.625rem;
  border-radius: 1.25rem;
  gap: 0.3125rem;
}

.login span:first-child,
.logout span:first-child {
  font-size: var(--fs-16px);
  font-weight: var(--fw-medium);
}

@media (max-width: 767px) {
  .login span:first-child,
  .logout span:first-child {
    font-size: 14px;
  }
}

.login span:last-child,
.logout span:last-child {
  display: block;
}

@media (max-width: 767px) {
  .login span:last-child,
  .logout span:last-child {
    font-size: 20px;
  }
}
</style>