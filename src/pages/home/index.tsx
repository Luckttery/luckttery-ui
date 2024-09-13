import { useState } from "react"
import { StyledContainer, StyledInputField, StyledButton, StyledError, StyledDataContainer, StyledResultList, StyledResultItem } from "./style"
import { fetchGetNumber } from "../../api/lucktteryApi/api"

const Home = () => {
  const [number, setNumber] = useState<number | null>(null)
  const [median, setmedian] = useState<number>(50)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const getData = async () => {
    if (number == null || number === 0) return alert("세트 수가 입력되지 않았습니다.")
    try {
      if (number) {
        const result = await fetchGetNumber(number, median)
        setData(result.sets)
        setError(null)
      }
    } catch (error) {
      alert(error)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setNumber(value ? Number(value) : null)
  }

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setmedian(Number(event.target.value));
  };

  return (
    <StyledContainer>
      <StyledInputField
        type="number"
        placeholder="세트 수"
        value={number !== null ? number : ''}
        onChange={handleInputChange}
      />
       <input
        type="range"
        min="50"
        max="100"
        step="10"
        value={median}
        onChange={handleSliderChange}
        style={{ width: "300px", margin: "20px 0" }}
      />
      <StyledButton onClick={() => getData()}>번호 추천 받기</StyledButton>

      {error && <StyledError>{error}</StyledError>}

      {data && (
        <StyledDataContainer>
          <h2>추천 번호</h2>

          <StyledResultList>
            {data.map((num: number[], index: number) => (
              <StyledResultItem key={index}>
              </StyledResultItem>
            ))}
          </StyledResultList>
        </StyledDataContainer>
      )}
    </StyledContainer>
  )
}

export default Home
