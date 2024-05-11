<template>
  <form>
    <div class="search align">
      <span class="search-icon material-symbols-outlined">search</span>
      <input class="search-input" type="search" placeholder="What are you looking for ?" />
    </div>
  </form>
</template>

<script setup></script>

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

.search-input::placeholder,
.search-icon {
  color: hsla(0, 0%, 0%, 0.25);
}
</style>
