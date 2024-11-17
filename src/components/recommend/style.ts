import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex: 1 1 50%;
  padding: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;