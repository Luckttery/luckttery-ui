import lucktteryClient from "./client"
import { ResponsNumber } from "./types"

export const fetchGetNumber = async (data: number): Promise<ResponsNumber> => {
  try {
    const response = await lucktteryClient.get(`/lottery/numbers?set_count=${data}`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}