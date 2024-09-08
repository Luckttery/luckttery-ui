import axios from "axios"

const lucktteryClient = axios.create({
  baseURL: 'https://api.luctery.com',
  withCredentials: true,
})

export default lucktteryClient