import api from "@/services/axios-service/api"

export const trendyProducts = {
  namespaced: true,
  state: {
    trendyProducts: [],
    currentPage: 1,
    lastPage: 1,
    errorMsg: "",
    hasMorePages: true,
  },
  mutations: {
    setTrendyProducts: (state, data) => {
      state.trendyProducts = data.data
      state.currentPage = data.current_page
      state.lastPage = data.last_page
      state.hasMorePages = data.current_page < data.last_page
    },
    setError: (state, error) => {
      state.errorMsg = error
    },
  },
  actions: {
    fetchTrendyProducts: async (context, page) => {
      if (page > context.state.lastPage) return
      try {
        const response = await api.get(`api/product/trendy?page=${page}`)
        context.commit("setTrendyProducts", response.data.products)
      } catch (err) {
        context.commit("setError", err.message)
      }
    },
  },
  getters: {
    getTrendyProducts: (state) => state.trendyProducts,
    getCurrentPage: (state) => state.currentPage,
    getLastPage: (state) => state.lastPage,
    hasMorePages: (state) => state.hasMorePages,
  },
}
