<template>
  <div class="loader-content">
    <div class="preloader"></div>
  </div>
</template>

<script setup></script>

<style scoped>
.loader-content {
  position: fixed;
  z-index: 100;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100vh;
}

.preloader {
  display: grid;
  place-items: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: conic-gradient(
    from 180deg at 50% 50%,
    rgba(82, 0, 255, 0) 0deg,
    var(--primary-clr-400) 360deg
  );
  animation: spin 2s infinite linear;
}
.preloader::before {
  content: "";
  border-radius: 50%;
  width: 80%;
  height: 80%;
  background-color: var(--primary-clr-1000);
}

@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}
</style>
