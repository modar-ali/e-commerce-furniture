<template>
  <div class="form-overlay">
    <div class="update-location">
      <span @click="$emit('close')" class="close-icon material-symbols-outlined"
        >close</span
      >
      <h2 class="form-title">Edit Form :</h2>
      <form class="update-form" @submit.prevent="updateLocation">
        <div class="location__city">
          <input type="text" placeholder="City *" v-model="location.city" />
          <span
            class="errMsg"
            v-for="error in v$.city.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}</span
          >
        </div>
        <div class="location__street">
          <input type="text" placeholder="Street *" v-model="location.street" />
          <span
            class="errMsg"
            v-for="error in v$.street.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}</span
          >
        </div>
        <div class="location__building">
          <input
            type="text"
            placeholder="Building *"
            v-model="location.building"
          />
          <span
            class="errMsg"
            v-for="error in v$.building.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}</span
          >
        </div>
        <button class="save-location">Save</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import useVuelidate from "@vuelidate/core"
import { required } from "@vuelidate/validators"
import { useStore } from "vuex"

// Define Store & Props & Emit :
const store = useStore()
const props = defineProps({
  locationId: Number,
})
const emit = defineEmits("close")

// Define Data :
const location = ref({
  city: "",
  street: "",
  building: "",
})

const rules = computed(() => {
  return {
    city: { required },
    street: { required },
    building: { required },
  }
})

const v$ = useVuelidate(rules, location)

// Define Methods :
const fetchUserLocations = async () => {
  await store.dispatch("locations/fetchUserLocations")
}

const updateLocation = async () => {
  let isFormValid = await v$.value.$validate()
  if (isFormValid) {
    await store.dispatch("locations/updateLocation", {
      location: location.value,
      locationId: props.locationId,
    })
    emit("close")
  }
  fetchUserLocations()
}
</script>

<style scoped>
.form-overlay {
  display: grid;
  place-items: center;
  height: calc(100vh - 70px);
  width: 100%;
  position: fixed;
  background-color: hsla(0, 0%, 100%, 0.9);
}

.update-location {
  position: relative;
  display: grid;
  gap: 0.625rem;
  width: 500px;
  padding: 1.25rem;
  border-radius: 0.625rem;
  background-color: var(--primary-clr-1000);
  box-shadow: 0 0 5px 0 var(--secondary-clr-700);
}

.close-icon {
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 18px;
  padding: 0.3125rem;
  border-radius: 50%;
  transition: 0.3s;
}

.close-icon:hover {
  background-color: var(--secondary-clr-900);
}

.update-form {
  display: grid;
  gap: 0.625rem;
}

.location__city > input,
.location__street > input,
.location__building > input {
  width: 100%;
  padding: 0.625rem 0;
  border: none;
  border-bottom: 1px solid var(--secondary-clr-700);
  outline: none;
  background-color: transparent;
}

.errMsg {
  display: block;
  color: hsl(0, 100%, 50%);
  font-size: 0.75rem;
  font-weight: var(--fw-bold);
}

.save-location {
  cursor: pointer;
  background-color: var(--primary-clr-400);
  color: var(--primary-font-clr-1000);
  font-size: 1rem;
  font-weight: var(--fw-bold);
  padding-block: 0.3125rem;
  margin-top: 1.25rem;
  border: none;
  border-radius: 1.25rem;
}
</style>
