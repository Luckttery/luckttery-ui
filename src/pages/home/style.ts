import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
`;

export const StyledInputField = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

export const StyledButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 20px;

  &:hover {
    background-color: #218838;
    transform: translateY(-2px); /* 살짝 올라가는 효과 */
  }

  &:active {
    transform: translateY(0); /* 클릭 시 원래 자리로 돌아감 */
  }
`;

export const StyledError = styled.div`
  color: red;
  margin-top: 10px;
`;

export const StyledDataContainer = styled.div`
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const StyledResultList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const StyledResultItem = styled.li`
  margin: 10px 0;
  font-size: 18px;
  strong {
    font-weight: bold;
    color: #007bff;
  }
`;

export const LogoImage = styled.img`
  width: 180px;
  height: 80px;
`;

