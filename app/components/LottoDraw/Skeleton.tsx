import Skeleton from "react-loading-skeleton"
import Paper from "../Paper";
import styles from "./styles.module.scss";
import LottoSetSkeleton from "../LottoSet/Skeleton";

export const LottoDrawSkeleton = () => {
  return (
    <Paper className={styles.container}>
      <h2 className={styles.title}><Skeleton width={220} /></h2>
      <div className={styles.lottoSet}>
        <LottoSetSkeleton numberCount={6} hasBonusNumber />
      </div>
    </Paper>
  )
}

export default LottoDrawSkeleton;