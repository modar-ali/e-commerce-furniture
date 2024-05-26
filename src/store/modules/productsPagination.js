import api from "@/services/axios-service/api"

export const productsPagination = {
  namespaced: true,
  state: {
    products: [],
    category: "",
    currentPage: 1,
    lastPage: 1,
    errorMsg: "",
    hasMorePages: true,
  },
  mutations: {
    setProducts: (state, data) => {
      state.products = data.data
      state.currentPage = data.current_page
      state.lastPage = data.last_page
      state.hasMorePages = data.current_page < data.last_page
    },
    setCategoryName: (state, category) => {
      state.category = category
    },
    setError: (state, error) => {
      state.errorMsg = error
    },
  },
  actions: {
    fetchProducts: async (context, endpoint) => {
      if (context.state.currentPage > context.state.lastPage) return
      try {
        const response = await api.get(endpoint)
        context.commit("setProducts", response.data.products)
        context.commit("setCategoryName", response.data.category.name)
      } catch (err) {
        context.commit("setError", err.message)
      }
    },
  },
  getters: {
    getProducts: (state) => state.products,
    getCategoryName: (state) => state.category,
    getCurrentPage: (state) => state.currentPage,
    hasMorePages: (state) => state.hasMorePages,
  },
}
