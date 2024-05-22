<template>
  <div class="catagories-scroller snaps-inline">
    <div class="catagories-element" v-for="photo in photos" :key="photo.id">
      <img :src="getImageUrl(photo.image)" :alt="photo.name" />
      <p class="title">{{ photo.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { useStore } from "vuex"

// Define Store :
const store = useStore()

// Define Data :
const baseURL = ref("http://localhost:8000")
const photos = computed(() => {
  return store.getters["scroller/getCategoriesPhotos"]
})

// Define Methods :
const fetchPhotos = async () => {
  await store.dispatch("scroller/fetchCategoriesPhotos")
}

const getImageUrl = (imagePath) => {
  return `${baseURL.value}${imagePath}`
}

onMounted(() => {
  fetchPhotos()
})
</script>

<style scoped>
.catagories-scroller {
  --spacer: 0.9375rem;
  --gap: 3.5rem;
  display: grid;
  gap: var(--gap);
  grid-auto-flow: column;
  grid-auto-columns: 14%;
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  padding: var(--spacer) 0;
}

@media (max-width: 767px) {
  .catagories-scroller {
    --mob-gap: 1.5625rem;
    --mob-spacer: 0.625rem;
    gap: var(--mob-gap);
    grid-auto-columns: 27%;
    padding: 0.625rem 0;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .catagories-scroller {
    grid-auto-columns: 21%;
  }
}

.catagories-scroller > * {
  display: grid;
  grid-template-rows: min-content;
  gap: var(--spacer);
  background-color: var(--secondary-clr-900);
  padding: var(--spacer);
  border-radius: 3px;
  box-shadow: 0 0 5px 0 var(--secondary-clr-900);
}

@media (max-width: 767px) {
  .catagories-scroller > * {
    gap: var(--mob-spacer);
    padding: var(--mob-spacer);
    background-color: var(--primary-clr-1000);
  }
}

.snaps-inline {
  scroll-snap-type: inline mandatory;
  scroll-padding-inline: var(--spacer);
}

.snaps-inline > * {
  scroll-snap-align: start;
}

.catagories-element > img {
  inline-size: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.catagories-element > p {
  text-align: center;
  font-weight: var(--fw-bold);
}

@media (max-width: 767px) {
  .catagories-element > img {
    border-radius: 50%;
  }
  .catagories-element > p {
    font-size: var(--fs-12px);
  }
}

::-webkit-scrollbar {
  height: 0.4375rem;
}

::-webkit-scrollbar-track {
  background-color: var(--secondary-clr-900);
  border-radius: 100vw;
}

::-webkit-scrollbar-thumb {
  background-color: var(--primary-clr-400);
  border-radius: 100vw;
  border: 2px solid var(--secondary-clr-900);
}
</style>
