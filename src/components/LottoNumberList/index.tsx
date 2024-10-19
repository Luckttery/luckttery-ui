import LottoNumber from "../number"
import { StyledContainer, StyledDataContainer, StyledResultItem, StyledResultList } from "./style"

interface LottoNumberListProps {
  lottoData: number[][]
}

const LottoNumberList: React.FC<LottoNumberListProps> = ({ lottoData }) => {
  return (
    <StyledContainer>
      {lottoData.length !== 0 && (
        <StyledDataContainer>
          <h2>추천 번호</h2>
          <StyledResultList>
            {lottoData.map((num: number[], index: number) => (
              <StyledResultItem key={index}>
                <LottoNumber numbers={num}></LottoNumber>
              </StyledResultItem>
            ))}
          </StyledResultList>
        </StyledDataContainer>
      )}
    </StyledContainer>
  )
}

export default LottoNumberList
