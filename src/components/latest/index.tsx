import { useEffect, useState } from "react";
import { fetchLatest } from "../../api/lucktteryApi/api";
import LottoNumber from "../number";
import { DrawHighlight, StyledContainer, StyledNumbersContainer } from "./style";
import { LottoDrawResponse } from "../../api/lucktteryApi/types";
import { Circle } from "../number/style";

const Latest = () => {
  const [drawdata, setDrawdata] = useState<LottoDrawResponse>()

  useEffect(() => {
    const getdrawData = async () => {
      await getLottoDrawData()
    };
    getdrawData()
  }, [])

  const getLottoDrawData = async () => {
    try {
      const result = await fetchLatest()
      setDrawdata(result)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <StyledContainer>
      <h2>
        <DrawHighlight>{drawdata?.draw}회 </DrawHighlight>
        당첨 번호
      </h2>
      <StyledNumbersContainer>
        <LottoNumber numbers={drawdata?.numbers}></LottoNumber>
        <h2>+</h2>
        <Circle key={1} $number={drawdata?.bonus_number}>{drawdata?.bonus_number}</Circle>
      </StyledNumbersContainer>
    </StyledContainer>
  )
}

export default Latest
