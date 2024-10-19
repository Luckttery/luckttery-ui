import { useState } from "react"
import { fetchGetNumber } from "../../api/lucktteryApi/api"
import { StyledButton, StyledContainer, StyledForm, StyledInputField, StyledRangeSelectedTrack, StyledRangeThumb, StyledRangeTrack, StyledThumbLabel } from "./style"
import { Range } from "react-range"

const STEP = 10
const MIN = 0
const MAX = 100

interface RecommedOptionFormProps {
  onDataChange: (data: number[][]) => void
}

const RecommedOptionForm : React.FC<RecommedOptionFormProps> = ({ onDataChange }) => {
  const [number, setNumber] = useState<number | null>(null)
  const [medianRange, setMedianRange] = useState([0, 100])

  const getLottoData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (number == null || number === 0) return alert("세트 수가 입력되지 않았습니다.")
    if (medianRange[0] === medianRange[1]) return alert("하위 빈도 값과 상위 빈도 값이 달라야 합니다.")
    
    try {
      const result = await fetchGetNumber(number, medianRange[0], medianRange[1])
      onDataChange(result.sets) // 데이터를 상위 컴포넌트로 전달
    } catch (error) {
      alert(error)
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    setNumber(value < 0 ? 0 : value)
  };

  const handleRangeChange = (values: number[]) => {
    setMedianRange(values)
  };

  return (
    <StyledContainer>
      <StyledForm>
        <StyledInputField
          type="number"
          placeholder="세트 수"
          value={number !== null ? number : ""}
          onChange={handleInputChange}
        />
        <Range
          step={STEP}
          min={MIN}
          max={MAX}
          values={medianRange}
          onChange={handleRangeChange}
          renderTrack={({ props, children }) => {
            const [min, max] = medianRange;
            const trackLeft = ((min - MIN) / (MAX - MIN)) * 100
            const trackWidth = ((max - min) / (MAX - MIN)) * 100
            return (
              <StyledRangeTrack {...props}>
                <StyledRangeSelectedTrack $left={trackLeft} $width={trackWidth} />
                {children}
              </StyledRangeTrack>
            )
          }}
          renderThumb={({ props, index }) => (
            <StyledRangeThumb {...props} key={props.key}>
              <StyledThumbLabel>{medianRange[index]}</StyledThumbLabel>
            </StyledRangeThumb>
          )}
        />
        <StyledButton onClick={getLottoData}>번호 추천 받기</StyledButton>
      </StyledForm>
    </StyledContainer>
  )
}

export default RecommedOptionForm
