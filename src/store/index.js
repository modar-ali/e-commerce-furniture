import { createStore } from "vuex"
import { auth } from "./modules/auth"

const store = createStore({
  state: {
    isLoading: false,
  },
  mutations: {
    setIsLoading: (state, status) => {
      state.isLoading = status
    },
  },
  getters: {
    getLoadingStatus: (state) => {
      return state.isLoading
    },
  },
  modules: {
    auth,
  },
})

export default store
