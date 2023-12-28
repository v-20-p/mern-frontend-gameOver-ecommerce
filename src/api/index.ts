import axios from 'axios'

const isDevelopment = import.meta.env.MODE === 'development'
export let baseURL = 'https://sda-online-mern-backend-ecommerce.vercel.app/'

if (!isDevelopment) {
  // Update this later when you have a working backend server
  baseURL = 'https://sda-online-mern-backend-ecommerce.vercel.app/'
}

const api = axios.create({
  withCredentials:true,
  baseURL
})


export default api
