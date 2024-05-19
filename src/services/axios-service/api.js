import axios from "axios"

const api = axios.create({
  baseURL: "https://asp-enjoyed-bonefish.ngrok-free.app/",
  headers: {
    common: {
      "ngrok-skip-browser-warning": "234334",
    },
  },
})

const token = localStorage.getItem("accessToken")
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export default api