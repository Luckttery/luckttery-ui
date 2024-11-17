import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const StyledLoader = styled.div`
  border: 6px solid #f3f3f3;
  border-radius: 50%;
  border-top: 6px solid #69C8F2;
  animation: spin 2s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const StyledError = styled.div`
  color: red;
  margin-top: 10px;
`;

export const StyledResultList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledResultItem = styled.li`
  margin: 10px 0;
  font-size: 18px;
  strong {
    font-weight: bold;
    color: #007bff;
  }
`;