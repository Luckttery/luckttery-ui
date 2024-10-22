export type ResponseNumber = {
  sets: number[][]
}

export type LottoDrawResponse = {
  _id: string
  draw: number
  date: Date
  first_prize: PrizeResponse
  second_prize: PrizeResponse
  third_prize: PrizeResponse
  fourth_prize: PrizeResponse
  fifth_prize: PrizeResponse
  numbers: number[]
  bonus_number: number
}

export type PrizeResponse = {
  winners: number
  amount: number
}

export type StoreInfo = {
  _id: string
  address: Storeaddress
  location: StoreLocation
  name: string
  phone_number: string | null
  retailer_id: string
  selling_items: StoreSelling_items
}

export type Storeaddress = {
  additional_info: string
  district: string
  full_address: string
  land_lot_number: string
  region: string
  town: string
}

export type StoreLocation = {
  type: string
  coordinates: number[]
}

export type StoreSelling_items = {
  sells_lotto: boolean
  sells_annuity: boolean
  sells_speeto_500: boolean
  sells_speeto_1000: boolean
  sells_speeto_2000: boolean
}
