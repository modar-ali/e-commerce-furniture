<template>
  <div class="loading-animation" v-if="isLoading">
    <LoadingAnimation />
  </div>
  <div class="main-content" v-else>
    <header>
      <Navbar />
    </header>
    <TabBar />
    <div class="body">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue"
import TabBar from "./components/TabBar.vue"
import LoadingAnimation from "./components/LoadingAnimation.vue"
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
  padding-bottom: var(--section-padding);
}

.body {
  min-height: calc(100vh - 70px);
  display: grid;
  place-content: center;
  background-color: var(--primary-clr-1000);
}
</style>
