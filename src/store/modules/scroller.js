import api from "@/services/axios-service/api"

export const scroller = {
  namespaced: true,
  state: {
    categoriesPhotos: [],
    errorMsg: "",
  },
  mutations: {
    setCategoriesPhotos: (state, categoriesPhotos) => {
      state.categoriesPhotos = categoriesPhotos
    },
    setError: (state, error) => {
      state.errorMsg = error
    },
  },
  actions: {
    fetchCategoriesPhotos: async (context) => {
      try {
        const response = await api.get("api/category/index")
        context.commit("setCategoriesPhotos", response.data.categories)
      } catch (error) {
        context.commit("setError", error.message)
      }
    },
  },
  getters: {
    getCategoriesPhotos: (state) => state.categoriesPhotos,
  },
}
