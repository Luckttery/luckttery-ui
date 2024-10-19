import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  flex: 1;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const StyledInputField = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  transition: border-color 0.3s ease, background-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const StyledButton = styled.button`
  background-color: #69C8F2;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 15px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 20px;

  &:hover {
    background-color: #58B1D6;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const StyledRangeTrack = styled.div`
  height: 6px;
  background-color: #ccc;
  margin: 20px 0;
  position: relative;
`;

// Range 선택된 구간 (색칠된 부분)
export const StyledRangeSelectedTrack = styled.div<{ $left: number; $width: number }>`
  position: absolute;
  height: 100%;
  background-color: #69c8f2;
  left: ${(props) => props.$left}%;
  width: ${(props) => props.$width}%;
`;

export const StyledRangeThumb = styled.div`
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background-color: #69c8f2;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 6px #aaa;
`;

export const StyledThumbLabel = styled.div`
  position: absolute;
  top: -28px;
  color: #fff;
  font-weight: bold;
  padding: 2px;
  border-radius: 3px;
  background-color: #69c8f2;
`;
