import React, { useState } from "react";
import { Range } from "react-range";
import {
  StyledContainer,
  StyledInputField,
  StyledButton,
  StyledError,
  StyledDataContainer,
  StyledResultList,
  StyledResultItem
} from "./style";
import {
  StyledRangeTrack,
  StyledRangeThumb,
  StyledThumbLabel,
  StyledRangeSelectedTrack
} from "./style";
import LottoNumber from "../../components/number";
import { fetchGetNumber } from "../../api/lucktteryApi/api";
import Header from "../../components/Header";

const STEP = 10;
const MIN = 0;
const MAX = 100;

const Home = () => {
  const [number, setNumber] = useState<number | null>(null);
  const [medianRange, setMedianRange] = useState([0, 100]);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    if (number == null || number === 0) return alert("세트 수가 입력되지 않았습니다.");
    try {
      if (number) {
        const result = await fetchGetNumber(number, medianRange[0], medianRange[1]);
        setData(result.sets);
        setError(null);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNumber(value ? Number(value) : null);
  };

  const handleRangeChange = (values: number[]) => {
    setMedianRange(values);
  };

  return (
    <StyledContainer>
      <Header></Header>
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
          const trackLeft = ((min - MIN) / (MAX - MIN)) * 100;
          const trackWidth = ((max - min) / (MAX - MIN)) * 100;
          return (
            <StyledRangeTrack {...props}>
              <StyledRangeSelectedTrack $left={trackLeft} $width={trackWidth} />
              {children}
            </StyledRangeTrack>
          );
        }}
        renderThumb={({ props, index }) => (
          <StyledRangeThumb {...props} key={props.key}>
            <StyledThumbLabel>{medianRange[index]}</StyledThumbLabel>
          </StyledRangeThumb>
        )}
      />

      <StyledButton onClick={() => getData()}>번호 추천 받기</StyledButton>

      {error && <StyledError>{error}</StyledError>}

      {data && (
        <StyledDataContainer>
          <h2>추천 번호</h2>
          <StyledResultList>
            {data.map((num: number[], index: number) => (
              <StyledResultItem key={index}>
                <LottoNumber numbers={num}></LottoNumber>
              </StyledResultItem>
            ))}
          </StyledResultList>
        </StyledDataContainer>
      )}
    </StyledContainer>
  );
};

export default Home;
