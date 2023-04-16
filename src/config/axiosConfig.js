import axios from 'axios'

axios.defaults.baseURL = process.env.VITE_API_URL

axios.interceptors.request.use((config) => {
  const configuration = config
  const token = localStorage.getItem('token')
  if (token) {
    configuration.headers.Authorization = `Bearer ${token}`
  }

  return configuration
})

axios.interceptors.response.use(
  (response) => response.data,
  (err) => Promise.reject(err)
)

export default axios
