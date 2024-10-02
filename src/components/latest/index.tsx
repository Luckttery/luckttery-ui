import { useEffect, useState } from "react";
import { fetchLatest } from "../../api/lucktteryApi/api";
import LottoNumber from "../number";
import { DrawHighlight, StyledContainer, StyledNumbersContainer } from "./style";
import { LottoDrawResponse } from "../../api/lucktteryApi/types";
import { Circle } from "../number/style";
import Skeleton from "../skeleton";

const Latest = () => {
  const [drawdata, setDrawdata] = useState<LottoDrawResponse | null>(null)
  const [loading, setLoading] = useState(true)

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
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <StyledContainer>
      {loading ? (
        <Skeleton height = '50px' width="190px"/>
      ) : (
        <>
          <h2>
            <DrawHighlight>{drawdata?.draw}회 </DrawHighlight>
            당첨 번호
          </h2>
          </>
          )}
          {loading ? (
            <Skeleton height = '80px' width="500px"/>
          ) : (
            <>
          <StyledNumbersContainer>
            <LottoNumber numbers={drawdata?.numbers} />
            <h2>+</h2>
            <Circle key={1} $number={drawdata?.bonus_number}>
              {drawdata?.bonus_number}
            </Circle>
          </StyledNumbersContainer>
          </>
          )}
    </StyledContainer>
  );
};

export default Latest
