import api from "@/services/axios-service/api"

export const auth = {
  namespaced: true,
  state: {
    status: "",
    token: localStorage.getItem("accessToken") || "",
    user: {},
  },
  mutations: {
    authSuccess: (state, info) => {
      state.status = "success"
      state.user = info.user
      state.token = info.token
    },
    authError: (state) => {
      state.status = "error"
    },
    logout: (state) => {
      state.status = ""
      state.token = ""
      state.user = {}
    },
  },
  actions: {
    register: async (context, registerData) => {
      context.commit("setIsLoading", true, { root: true })
      try {
        const response = await api.post("api/auth/register", registerData)
        const token = response.data.access_token
        const user = response.data.user
        localStorage.setItem("accessToken", token)
        context.commit("authSuccess", { user, token })
        context.commit("setIsLoading", false, { root: true })
      } catch (error) {
        context.commit("authError")
        localStorage.removeItem("accessToken")
      }
    },
    login: async (context, loginData) => {
      context.commit("setIsLoading", true, { root: true })
      try {
        const response = await api.post("api/auth/login", loginData)
        const token = response.data.access_token
        const user = response.data.user
        localStorage.setItem("accessToken", token)
        context.commit("authSuccess", { user, token })
        context.commit("setIsLoading", false, { root: true })
      } catch (error) {
        context.commit("authError")
        localStorage.removeItem("accessToken")
      }
    },
    logout: async (context) => {
      context.commit("setIsLoading", true, { root: true })
      try {
        const response = await api.post("api/auth/logout")
        context.commit("logout")
        localStorage.removeItem("accessToken")
        delete api.defaults.headers.common["Authorization"]
        context.commit("setIsLoading", false, { root: true })
      } catch (error) {
        console.log(error.message)
      }
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    getUser: (state) => state.user,
  },
}
