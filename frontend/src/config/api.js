import axios from "axios"

const backendUrl = import.meta.env.VITE_BACKEND_URL
const token = localStorage.getItem("token")
const api = axios.create({
    baseURL: backendUrl,
    headers: {
        Authorization: `Bearer ${token}`
    }
})



export default api