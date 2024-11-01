import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
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

export const StyledDataContainer = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const StyledResultList = styled.ul`
  list-style-type: none;
`;

export const StyledResultItem = styled.li`
  margin: 10px 0;
  font-size: 18px;
  strong {
    font-weight: bold;
    color: #007bff;
  }
`;