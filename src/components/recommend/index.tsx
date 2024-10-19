import RecommedOptionForm from "../RecommedOptionForm"
import LottoNumberList from "../LottoNumberList"
import { useState } from "react"
import { StyledContainer } from "./style"

const Recommend = () => {
  const [lottoData, setLottoData] = useState<number[][]>([])

  const handleDataChange = (data: number[][]) => {
    setLottoData(data)
  }

  return (
    <StyledContainer>
      <RecommedOptionForm onDataChange={handleDataChange} />
      <LottoNumberList lottoData={lottoData}/>
    </StyledContainer>
  )
}

export default Recommend
