<template>
  <div class="categories-scroller snaps-inline">
    <RouterLink
      class="categories-element"
      v-for="photo in photos"
      :key="photo.id"
      :to="{ name: 'category-product', params: { id: photo.id } }"
    >
      <img :src="getImageUrl(photo.image)" :alt="photo.name" />
      <p class="title">{{ photo.name }}</p>
    </RouterLink>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

// Define Store & Router :
const store = useStore()
const router = useRouter()

// Define Data :
const baseURL = ref(import.meta.env.VITE_BASE_URL)
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
.categories-scroller {
  --spacer: 0.9375rem;
  --gap: 2.5rem;
  display: grid;
  gap: var(--gap);
  grid-auto-flow: column;
  grid-auto-columns: 18%;
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  padding: var(--spacer) 0;
  margin-bottom: 50px;
}

@media (max-width: 767px) {
  .categories-scroller {
    --mob-gap: 1.5625rem;
    --mob-spacer: 0.625rem;
    gap: var(--mob-gap);
    grid-auto-columns: 27%;
    padding: 0.625rem 0;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .categories-scroller {
    grid-auto-columns: 21%;
  }
}

.categories-scroller > * {
  display: grid;
  grid-template-rows: min-content;
  gap: var(--spacer);
  background-color: var(--secondary-clr-900);
  padding: var(--spacer);
  border-radius: 5px;
  box-shadow: 0 0 5px 0 var(--secondary-clr-900);
  transition:  0.3s;
}

@media (max-width: 767px) {
  .categories-scroller > * {
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

.router-link-active {
  transform: translateY(-15px);
}

.categories-element > img {
  inline-size: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.categories-element > p {
  text-align: center;
  font-size: 1.125rem;
  font-weight: var(--fw-bold);
  color: var(--primary-clr-400);
}

@media (max-width: 767px) {
  .categories-element > img {
    border-radius: 50%;
  }
  .categories-element > p {
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
