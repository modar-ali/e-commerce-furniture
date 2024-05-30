import api from "@/services/axios-service/api"

export const searchedProducts = {
  namespaced: true,
  state: {
    products: [],
    errorMsg: "",
  },
  mutations: {
    setProducts: (state, products) => {
      state.products = products
    },
    setErrorMsg: (state, errorMsg) => {
      state.errorMsg = errorMsg
    },
  },
  actions: {
    fetchSearchData: async (context, searchedData) => {
      try {
        const response = await api.get(`api/product/search/${searchedData}`)
        context.commit("setProducts", response.data.products)
      } catch (err) {
        context.commit("setErrorMsg", err.message)
      }
    },
  },
  getters: {
    getProducts: (state) => state.products,
  },
}
