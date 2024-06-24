import api from "@/services/axios-service/api"

export const cartManagement = {
  namespaced: true,
  state: {
    userCart: {},
    userCartErrorMsg: "",
    addResponse: {},
    addErrorMsg: "",
    removeResponse: {},
    removeErrorMsg: "",
    updateResponse: {},
    updateErrorMsg: "",
  },
  mutations: {
    setUserCart: (state, userCart) => {
      state.userCart = userCart
    },
    setUserCartErrorMsg: (state, userCartErrorMsg) => {
      state.userCartErrorMsg = userCartErrorMsg
    },
    setAddResponse: (state, addResponse) => {
      state.addResponse = addResponse
    },
    setAddErrorMsg: (state, addErrorMsg) => {
      state.addErrorMsg = addErrorMsg
    },
    setRemoveResponse: (state, removeResponse) => {
      state.removeResponse = removeResponse
    },
    setRemoveErrorMsg: (state, removeErrorMsg) => {
      state.removeErrorMsg = removeErrorMsg
    },
    setUpdateResponse: (state, updateResponse) => {
      state.updateResponse = updateResponse
    },
    setUpdateErrorMsg: (state, updateErrorMsg) => {
      state.updateErrorMsg = updateErrorMsg
    },
  },
  actions: {
    fetchUserCart: async (context) => {
      try {
        let response = await api.get("api/cart/get_user_cart")
        context.commit("setUserCart", response.data)
      } catch (error) {
        context.commit("setUserCartErrorMsg", error)
      }
    },
    addToCart: async (context, productId) => {
      try {
        let response = await api.post("api/cart/add_to_cart", productId)
        context.commit("setAddResponse", response.data)
      } catch (error) {
        context.commit("setAddErrorMsg", error)
      }
    },
    removeFromCart: async (context, productId) => {
      try {
        let response = await api.post("api/cart/remove_from_cart", productId)
        context.commit("setRemoveResponse", response.data)
      } catch (error) {
        context.commit("setRemoveErrorMsg", error)
      }
    },
    updateCart: async (context, payload) => {
      try {
        let response = await api.post("api/cart/update", payload)
        context.commit("setUpdateResponse", response.data)
      } catch (error) {
        context.commit("setUpdateErrorMsg", error)
      }
    },
  },
  getters: {
    getUserCart: (state) => state.userCart,
    getUserCartErrorMsg: (state) => state.userCartErrorMsg,
    getAddResponse: (state) => state.addResponse,
    getAddErrorMsg: (state) => state.addErrorMsg,
    getRemoveResponse: (state) => state.removeResponse,
    getRemoveErrorMsg: (state) => state.removeErrorMsg,
    getUpdateResponse: (state) => state.updateResponse,
    getUpdateErrorMsg: (state) => state.updateErrorMsg,
  },
}
