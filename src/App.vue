<template>
  <div class="loading-animation" v-if="isLoading">
    <LoadingAnimation />
  </div>
  <div class="main-content" v-else>
    <header>
      <Navbar />
    </header>
    <router-view />
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue"
import LoadingAnimation from "./components/LoadingAnimation.vue"
import Footer from "./components/Footer.vue"
import { useStore } from "vuex"
import { computed } from "vue"

const store = useStore()

const isLoading = computed(() => {
  return store.getters.getLoadingStatus
})
</script>

<style scoped>
header {
  background-color: var(--primary-clr-1000);
}

footer {
  background-color: #191919;
}
</style>
