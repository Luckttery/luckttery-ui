import RecommedOptionForm from "../RecommedOptionForm"
import LottoNumberList from "../LottoNumberList"
import { useState } from "react"
import { StyledContainer } from "./style"
import Intro from "../Intro"

const Recommend = () => {
  const [lottoData, setLottoData] = useState<number[][]>([])

  const handleDataChange = (data: number[][]) => {
    setLottoData(data)
  }

  return (
    <StyledContainer>
      { lottoData.length === 0 ? (
        <Intro />
      ) : (
        <LottoNumberList lottoData={lottoData}/>
      ) }
      <RecommedOptionForm onDataChange={handleDataChange} />
    </StyledContainer>
  )
}

export default Recommend
