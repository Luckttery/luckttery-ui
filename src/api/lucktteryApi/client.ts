import axios from "axios"

const lucktteryClient = axios.create({
  baseURL: 'https://api.luckttery.com',
  withCredentials: true,
})

export default lucktteryClient