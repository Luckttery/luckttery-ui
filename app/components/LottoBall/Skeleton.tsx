import { FC } from "react";
import styles from "./styles.module.scss";
import Skeleton from "react-loading-skeleton";

type LottoBallSkeletonProps = {
}

export const LottoBallSkeleton: FC<LottoBallSkeletonProps> = () => {
  return (
    <Skeleton circle className={styles.skeleton} />
  ) 
}

export default LottoBallSkeleton;