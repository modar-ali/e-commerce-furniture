import api from "@/services/axios-service/api"

export const orders = {
  namespaced: true,
  state: {
    userOrders: {},
    userOrdersErrorMsg: "",
    placeOrderRes: {},
    placeOrderErrorMsg: "",
    userSingleOrder: {},
    userSingleOrderErrorMsg: "",
    deleteOrderRes: {},
    deleteOrderErrorMsg: "",
    makePaymentRes: {},
    makePaymentErrorMsg: "",
  },
  mutations: {
    setUserOrders: (state, userOrders) => {
      state.userOrders = userOrders
    },
    setUserOrdersErrorMsg: (state, userOrdersErrorMsg) => {
      state.userOrdersErrorMsg = userOrdersErrorMsg
    },
    setPlaceOrderRes: (state, placeOrderRes) => {
      state.placeOrderRes = placeOrderRes
    },
    setPlaceOrderErrorMsg: (state, placeOrderErrorMsg) => {
      state.placeOrderErrorMsg = placeOrderErrorMsg
    },
    setUserSingleOrder: (state, userSingleOrder) => {
      state.userSingleOrder = userSingleOrder
    },
    setUserSingleOrderErrorMsg: (state, userSingleOrderErrorMsg) => {
      state.userSingleOrderErrorMsg = userSingleOrderErrorMsg
    },
    setDeleteOrderRes: (state, deleteOrderRes) => {
      state.deleteOrderRes = deleteOrderRes
    },
    setDeleteOrderErrorMsg: (state, deleteOrderErrorMsg) => {
      state.deleteOrderErrorMsg = deleteOrderErrorMsg
    },
    setMakePaymentRes: (state, makePaymentRes) => {
      state.makePaymentRes = makePaymentRes
    },
    setMakePaymentErrorMsg: (state, makePaymentErrorMsg) => {
      state.makePaymentErrorMsg = makePaymentErrorMsg
    },
  },
  actions: {
    fetchUserOrders: async (context) => {
      try {
        const response = await api.get("api/order/get_user_orders")
        context.commit("setUserOrders", response.data)
        console.log(response.data)
      } catch (error) {
        context.commit("setUserOrdersErrorMsg", error)
      }
    },
    placeOrder: async (context, { locationId, dateOfDelivery }) => {
      try {
        const response = await api.post("api/order/create", {
          location_id: locationId,
          date_of_delivery: dateOfDelivery,
        })
        context.commit("setPlaceOrderRes", response.data)
      } catch (error) {
        context.commit("setPlaceOrderErrorMsg", error)
      }
    },
    fetchUserSingleOrder: async (context, orderId) => {
      try {
        const response = await api.get(`api/order/show/${orderId}`)
        context.commit("setUserSingleOrder", response.data.order)
        console.log(response.data.order.location.city)
      } catch (error) {
        context.commit("setUserSingleOrderErrorMsg", error)
      }
    },
    deleteOrder: async (context, orderId) => {
      try {
        const response = await api.delete(`api/order/delete/${orderId}`)
        context.commit("setDeleteOrderRes", response.data)
      } catch (error) {
        context.commit("setDeleteOrderErrorMsg", error)
      }
    },
    makePayment: async (context, { orderId, phoneNumber, processNumber }) => {
      try {
        const response = await api.post(`api/order/pay/${orderId}`, {
          phone_number: phoneNumber,
          payment_process_number: processNumber,
        })
        context.commit("setMakePaymentRes", response.data)
      } catch (error) {
        context.commit("setMakePaymentErrorMsg", error)
      }
    },
  },
  getters: {
    getUserOrdersRes: (state) => state.userOrders,
    getPlaceOrderRes: (state) => state.placeOrderRes,
    getUserSingleOrder: (state) => state.userSingleOrder,
    getDeleteOrderRes: (state) => state.deleteOrderRes,
    getMakePaymentRes: (state) => state.makePaymentRes,
  },
}
