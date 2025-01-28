import { PrizeResponse } from "~/api/lucktteryApi/types";
import styles from "./styles.module.scss";
import { FC } from "react";

type PrizeTableProps = {
  first_prize: PrizeResponse
  second_prize: PrizeResponse
  third_prize: PrizeResponse
  fourth_prize: PrizeResponse
  fifth_prize: PrizeResponse
}

const PRIZE_KEYS = [
  'first_prize',
  'second_prize',
  'third_prize',
  'fourth_prize',
  'fifth_prize',
] as const;

const calculateTax = (amount: number): number => {
  const LOTTO_COST = 1000;
  const LIMIT_300M = 300000000;
  const taxableAmount = amount - LOTTO_COST;

  if (taxableAmount <= 2000000) {
    return amount;
  }

  return taxableAmount <= LIMIT_300M 
    ? taxableAmount * 0.78 + LOTTO_COST
    : taxableAmount - (LIMIT_300M * 0.22 + (taxableAmount - LIMIT_300M) * 0.33) + LOTTO_COST;
}

const formatKRW = (amount: number): string => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW'
  }).format(amount);
}

export const PrizeTable: FC<PrizeTableProps> = (props) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>순위</th>
            <th>당첨자 수</th>
            <th>당첨금</th>
            <th>세후 금액</th>
          </tr>
        </thead>
        <tbody>
          {PRIZE_KEYS.map((key, index) => {
            const prize = props[key];
            if (!prize) return null;
            return (
              <tr key={key}>
                <td>{index + 1}등</td>
                <td>{prize.winners.toLocaleString()}명</td>
                <td>{formatKRW(prize.amount)}</td>
                <td>{formatKRW(calculateTax(prize.amount))}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PrizeTable;