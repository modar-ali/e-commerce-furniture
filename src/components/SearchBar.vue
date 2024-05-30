<template>
  <form @submit.prevent="search">
    <div class="search align">
      <span class="search-icon material-symbols-outlined">search</span>
      <input
        class="search-input"
        type="search"
        v-model="searchedData"
        placeholder="Search..."
      />
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

// Define Router :
const router = useRouter()

// Define Data :
const searchedData = ref("")

// Define Methods :
const search = () => {
  router.push({ name: "searched-products", params: { name: searchedData.value } })
}
</script>

<style scoped>
.align {
  display: flex;
  align-items: center;
}

.search {
  gap: 0.875rem;
  padding: 0.625rem 0.875rem;
  border-radius: 1.75rem;
  background-color: var(--secondary-clr-900);
  transition: background 0.25s;
}

@media (max-width: 767px) {
  .search {
    gap: 0.1875rem;
    padding: 0.3125rem 0.4375rem;
  }
}

.search:focus-within {
  box-shadow: 0 0 2px hsla(0, 0%, 0%, 0.75);
}

.search-input {
  width: 100%;
  height: 1.25rem;
  font-size: var(--fs-16px);
  color: #333;
  outline: none;
  border: none;
  background-color: transparent;
}

@media (max-width: 767px) {
  .search-input {
    font-size: 14px;
  }
}

.search-input::placeholder,
.search-icon {
  color: hsla(0, 0%, 0%, 0.25);
  font-size: 1.125rem;
  font-weight: var(--fw-bold);
}

@media (max-width: 767px) {
  .search-icon {
    font-size: 20px;
  }
}
</style>
