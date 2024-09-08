import { useState } from "react";
import { StyledContainer, StyledInputField, StyledButton, StyledError, StyledDataContainer, StyledResultList, StyledResultItem, LogoImage } from "./style";
import { fetchGetNumber } from "../../api/lucktteryApi/api";
import logo from '../../assets/logo.png'

const Home = () => {
  const [number, setNumber] = useState<number>(1);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    try {
      const result = await fetchGetNumber(number);
      setData(result.sets);
      setError(null);
      console.log(data)
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(Number(event.target.value));
  };

  return (
    <StyledContainer>
      <LogoImage src={logo}/>
      <StyledInputField
        type="number"
        value={number}
        onChange={handleInputChange}
        min="1"
      />
      <StyledButton onClick={() => getData()}>번호 추천받기</StyledButton>

      {error && <StyledError>{error}</StyledError>}

      {data && (
        <StyledDataContainer>
          <h2>추천 번호</h2>
          <StyledResultList>
            {data.map((num: number[], index: number) => (
              <StyledResultItem key={index}>
                <strong>Set {index + 1}: </strong>
                {num.join(", ")}
              </StyledResultItem>
            ))}
          </StyledResultList>
        </StyledDataContainer>
      )}
    </StyledContainer>
  );
};

export default Home;
