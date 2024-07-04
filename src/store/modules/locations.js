import api from "@/services/axios-service/api"

export const locations = {
  namespaced: true,
  state: {
    userLocations: {},
    userlocationsErrorMsg: "",
    createRes: {},
    createErrorMsg: "",
    updateRes: {},
    updateErrorMsg: "",
    deleteRes: {},
    deleteErrorMsg: "",
  },
  mutations: {
    setUserLocations: (state, userLocations) => {
      state.userLocations = userLocations
    },
    setUserlocationsErrorMsg: (state, userlocationsErrorMsg) => {
      state.userlocationsErrorMsg = userlocationsErrorMsg
    },
    setCreateRes: (state, createRes) => {
      state.createRes = createRes
    },
    setCreateErrorMsg: (state, createErroMsg) => {
      state.createErroMsg = createErroMsg
    },
    setUpdateRes: (state, updateRes) => {
      state.updateRes = updateRes
    },
    setUpdateErrorMsg: (state, updateErrorMsg) => {
      state.updateErrorMsg = updateErrorMsg
    },
    setDeleteRes: (state, deleteRes) => {
      state.deleteRes = deleteRes
    },
    setDeleteErrorMsg: (state, deleteErrorMsg) => {
      state.deleteErrorMsg = deleteErrorMsg
    },
  },
  actions: {
    fetchUserLocations: async (context) => {
      try {
        let response = await api.get("api/location/get_user_locations")
        context.commit("setUserLocations", response.data)
      } catch (error) {
        context.commit("setUserlocationsErrorMsg", error)
      }
    },
    createLocation: async (context, fullLocation) => {
      try {
        let response = await api.post("api/location/create", fullLocation)
        context.commit("setCreateRes", response.data)
      } catch (error) {
        context.commit("setCreateErrorMsg", error)
      }
    },
    deleteLocation: async (context, locationId) => {
      try {
        let response = await api.delete(`api/location/delete/${locationId}`)
        context.commit("setDeleteRes", response.data)
      } catch (error) {
        context.commit("setDeleteErrorMsg", error)
      }
    },
    updateLocation: async (context, { location, locationId }) => {
      try {
        let response = await api.post(
          `api/location/update/${locationId}`,
          location
        )
        context.commit("setUpdateRes", response.data)
      } catch (error) {
        context.commit("setUpdateErrorMsg", error)
      }
    },
  },
  getters: {
    getUserLocations: (state) => state.userLocations,
    getUserLocationsErrorMsg: (state) => state.userlocationsErrorMsg,
    getCreateRes: (state) => state.createRes,
    getCreateErrorMsg: (state) => state.createErroMsg,
    getDeleteRes: (state) => state.deleteRes,
    getDeleteErrorMsg: (state) => state.deleteErrorMsg,
    getUpdateRes: (state) => state.updateRes,
    getUpdateErrorMsg: (state) => state.updateErrorMsg,
  },
}
