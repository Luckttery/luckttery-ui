import lucktteryClient from "./client"
import { ResponsNumber } from "./types"

export const fetchGetNumber = async (number: number, median: number): Promise<ResponsNumber> => {
  try {
    const response = await lucktteryClient.get(`/lotto/recommend?set_count=${number}&median_frequency_percentage=${median}`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}