import axios from "axios"

const api = axios.create({
  baseURL: "https://asp-enjoyed-bonefish.ngrok-free.app/",
})

const token = localStorage.getItem("accessToken")
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export default api
