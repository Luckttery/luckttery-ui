import lucktteryClient from "./client"
import { ResponsNumber } from "./types"

export const fetchGetNumber = async (number: number, lower: number, upper: number): Promise<ResponsNumber> => {
  try {
    console.log(lower, upper)
    const response = await lucktteryClient.get(`/lotto/recommend?set_count=${number}&lower_percent=${lower}&upper_percent=${upper}`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}