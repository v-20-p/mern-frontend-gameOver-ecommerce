import axios from 'axios'

const isDevelopment = import.meta.env.MODE === 'development'
export let baseURL = 'http://localhost:5050/'

if (!isDevelopment) {
  // Update this later when you have a working backend server
  baseURL = 'http://localhost:5050/'
}

const api = axios.create({
  withCredentials:true,
  baseURL
})


export default api
