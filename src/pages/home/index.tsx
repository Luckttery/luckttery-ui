import React, { useEffect, useState } from "react";
import { StyledContainer} from "./style";
import LottoNumber from "../../components/number";
import { fetchLatest } from "../../api/lucktteryApi/api";
import Header from "../../components/Header";
import { LottoDrawResponse } from "../../api/lucktteryApi/types";
import { Circle } from "../../components/number/style";
import Recommend from "../../components/recommend";

const Home = () => {
  const [drawdata, setDrawdata] = useState<LottoDrawResponse>()

  useEffect(() => {
    const getdrawData = async () => {
      await getLottoDrawData() 
    }
    getdrawData()
  }, [])

  const getLottoDrawData = async () => {
    try {
      const result = await fetchLatest()
      setDrawdata(result)
    } catch (error){
      alert(error)
    }
  }

  return (
    <StyledContainer>
      <Header/>
      <Recommend/>

      <h3>{drawdata?.draw}회 당첨 번호</h3>
      <LottoNumber numbers={drawdata?.numbers}></LottoNumber>
      <h2>+</h2>
      <Circle key={1} $number={drawdata?.bonus_number}>
          {drawdata?.bonus_number}
      </Circle>
    </StyledContainer>
  );
};

export default Home;
