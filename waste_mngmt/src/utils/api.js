import axios from 'axios'

// ─── Create axios instance ────────────────────────────────────────────────────
const api = axios.create({
  baseURL: 'http://localhost:5000/api',   // your Express server
})

// ─── Request interceptor ──────────────────────────────────────────────────────
// Runs before every request — attaches JWT token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ─── Response interceptor ─────────────────────────────────────────────────────
// Runs after every response — handles token expiry globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clear storage and redirect to login
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api