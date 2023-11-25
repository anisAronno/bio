import axios from 'axios'
import { config } from '../config'

const http = axios.create({
  baseURL: config.server_url,
  timeout: 60000
})

http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

export default http
