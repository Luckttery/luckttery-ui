import { FC } from 'react';
import LottoBall from '~/components/LottoBall';
import styles from './styles.module.scss';
import SkeletonLottoBall from '../LottoBall/Skeleton';

type LottoSetProps = {
  numberCount: number
  hasBonusNumber: boolean
};

const LottoSetSkeleton: FC<LottoSetProps> = ({ numberCount, hasBonusNumber }) => {
  return (
    <div className={styles.lottoSet}>
      <div className={styles.mainNumbers}>
        {Array.from({ length: numberCount }).map((_, index) => (
          <SkeletonLottoBall key={index} />
        ))}
      </div>
      {hasBonusNumber && (
        <div className={styles.bonusWrapper}>
          <div className={styles.plusIcon}>+</div>
          <SkeletonLottoBall />
        </div>
      )}
    </div>
  );
};

export default LottoSetSkeleton;