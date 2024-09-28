import styled from 'styled-components'

type CircleProps = {
  $number: number
}

export const CircleContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

export const Circle = styled.div<CircleProps>`
  width: 54px;
  height: 54px;
  background-color: ${(props) => {
    if (props.$number >= 1 && props.$number <= 9) return "#FFD83D"
    if (props.$number >= 10 && props.$number <= 19) return "#61DAFF"
    if (props.$number >= 20 && props.$number <= 29) return "#FF7376"
    if (props.$number >= 30 && props.$number <= 39) return "#B9B9B9"
    return "#62D604"
  }};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #FFFFFF;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;
