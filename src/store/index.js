import { createStore } from "vuex"
import { auth } from "./modules/auth"
import { scroller } from "./modules/scroller"
import { productsPagination } from "./modules/productsPagination"
import { showProduct } from "./modules/showProduct"
import { searchedProducts } from "./modules/searchedProducts"
import { cartManagement } from "./modules/cartManagement"
import { locations } from "./modules/locations"
import { orders } from "./modules/orders"

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
    searchedProducts,
    cartManagement,
    locations,
    orders,
  },
})

export default store
