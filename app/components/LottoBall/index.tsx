import styles from "./styles.module.scss";

type LottoBallProps = {
  number: number;
};

export const LottoBall: React.FC<LottoBallProps> = ({ number }: LottoBallProps) => {
  const getBallColor = (number: number) => {
    if (number >= 1 && number <= 9) return styles.yellow;
    if (number >= 10 && number <= 19) return styles.blue;
    if (number >= 20 && number <= 29) return styles.red;
    if (number >= 30 && number <= 39) return styles.gray;
    return styles.green;
  };

  return (
    <div className={`${styles.lottoBall} ${getBallColor(number)}`}>
      {number}
    </div>
  ) 
}

export default LottoBall;