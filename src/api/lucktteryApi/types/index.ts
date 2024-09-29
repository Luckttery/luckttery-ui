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
