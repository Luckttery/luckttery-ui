import lucktteryClient from "./client"
import { LottoDrawResponse, ResponseNumber } from "./types"

export const fetchGetNumber = async (number: number, lower: number, upper: number): Promise<ResponseNumber> => {
  try {
    const response = await lucktteryClient.get(`/lotto/recommend?set_count=${number}&lower_percent=${lower}&upper_percent=${upper}`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export const fetchLatest = async (): Promise<LottoDrawResponse> => {
  try {
    const response = await lucktteryClient.get('/lotto/draws/latest')
    return response.data
  } catch (error: unknown) {
    throw error
  }
}