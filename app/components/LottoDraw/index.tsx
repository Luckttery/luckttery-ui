import { FC } from "react";
import LottoSet from "../LottoSet";
import Paper from "../Paper";
import styles from "./styles.module.scss";

type LottoDrawProps = {
  draw: number
  date: Date
  numbers: number[]
  bonus_number: number,
}

export const LottoDraw: FC<LottoDrawProps> = ({
  draw,
  date,
  numbers,
  bonus_number,
}) => {
  return (
    <Paper className={styles.container}>
      <h2 className={styles.title}>{draw}회 <span>({date.toString()})</span></h2>
      <div className={styles.lottoSet}>
        <LottoSet numbers={numbers} bonusNumber={bonus_number} />
      </div>
    </Paper>
  )
}

export default LottoDraw;