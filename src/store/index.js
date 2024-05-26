import { createStore } from "vuex"
import { auth } from "./modules/auth"
import { scroller } from "./modules/scroller"
import { productsPagination } from "./modules/productsPagination"
import {showProduct} from "./modules/showProduct"

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
    scroller,
    productsPagination,
    showProduct,
  },
})

export default store