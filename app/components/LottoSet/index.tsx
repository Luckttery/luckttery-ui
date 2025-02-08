import { FC } from 'react';
import LottoBall from '~/components/LottoBall';
import styles from './styles.module.scss';

type LottoSetProps = {
  numbers: number[];
  bonusNumber?: number;
};

const LottoSet: FC<LottoSetProps> = ({ numbers, bonusNumber }) => {
  const sortedNumbers = [...numbers].sort((a, b) => a - b);

  return (
    <div className={styles.lottoSet}>
      <div className={styles.mainNumbers}>
        {sortedNumbers.map((number, index) => (
          <LottoBall key={index} number={number} />
        ))}
      </div>
      {bonusNumber !== undefined && (
        <div className={styles.bonusWrapper}>
          <div className={styles.plusIcon}>+</div>
          <LottoBall number={bonusNumber} />
        </div>
      )}
    </div>
  );
};

export default LottoSet;