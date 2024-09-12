import { CircleContainer, Circle } from "./style";

type LottoNumberProps = {
  numbers: number[];
};

const LottoNumber = ({ numbers }: LottoNumberProps) => {
  return (
    <CircleContainer>
      {numbers.map((number, index) => (
        <Circle key={index} number={number}>
          {number}
        </Circle>
      ))}
    </CircleContainer>
  );
};

export default LottoNumber;
