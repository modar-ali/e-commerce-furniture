import api from "@/services/axios-service/api"

export const showProduct = {
  namespaced: true,
  state: {
    product: {},
    errorMsg: "",
  },
  mutations: {
    setProduct: (state, product) => {
      state.product = product
    },
    setError: (state, errorMsg) => {
      state.errorMsg = errorMsg
    },
  },
  actions: {
    fetchProduct: async (context, endpoint) => {
      try {
        const response = await api.get(endpoint)
        context.commit("setProduct", response.data.product)
      } catch (err) {
        context.commit("setError", err.message)
      }
    },
  },
  getters: {
    getProduct: (state) => state.product,
  },
}
