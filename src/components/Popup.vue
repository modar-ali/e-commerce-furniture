<template>
  <div class="status-popup" v-if="isVisible">
    <p class="res-message">{{ popupMsg }}</p>
    <span
      class="close-icon material-symbols-outlined"
      @click="isVisible = false"
      >close</span
    >
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"

const props = defineProps({
  popupMsg: String,
})

const isVisible = ref(true)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = false
  }, 2000)
})
</script>

<style scoped>
.status-popup {
  width: fit-content;
  background-color: var(--secondary-clr-100);
  color: var(--primary-clr-1000);
  position: fixed;
  z-index: 100;
  top: 20%;
  right: 2.5%;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 1.25rem;
  border-radius: 0.3125rem;
}

.res-message {
  font-weight: var(--fw-bold);
  font-size: 1rem;
}

.close-icon {
  border-radius: 50%;
  padding: 0.3125rem;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
}

.close-icon:hover {
  background-color: var(--secondary-clr-300);
}
</style>
