import lucktteryClient from "./client"
import { CursorPage, LottoDrawResponse, ResponseNumber, StoreInfo } from "./types"

export const fetchGetNumber = async (number: number, lower: number, upper: number): Promise<ResponseNumber> => {
  const response = await lucktteryClient.get(`/lotto/recommend?set_count=${number}&lower_percent=${lower}&upper_percent=${upper}`)
  return response.data
}

export const fetchLatest = async (): Promise<LottoDrawResponse> => {
  const response = await lucktteryClient.get('/lotto/draws/latest')
  return response.data
}

export const fetchStoreList = async (latitude: number, longitude: number, radius: number): Promise<StoreInfo[]> => {
  const response = await lucktteryClient.get(`/retail-store/nearby?latitude=${latitude}&longitude=${longitude}&radius=${radius}`)
  return response.data
}

export const fetchDraws = async (cursor: number | string | undefined, limit: number, sort: string): Promise<CursorPage<LottoDrawResponse>> => {
  const request = {
    cursor: cursor,
    limit: limit,
    sort: sort,
  };

  const response = await lucktteryClient.get(`/lotto/draws`, { params: request });
  return response.data;
}

export const fetchDraw = async (draw: number): Promise<LottoDrawResponse> => {
  const response = await lucktteryClient.get(`/lotto/draws/${draw}`);
  return response.data;
}