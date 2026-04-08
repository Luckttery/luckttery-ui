import styles from "./styles.module.scss";
import Skeleton from "react-loading-skeleton";

export const LottoBallSkeleton = () => {
  return (
    <Skeleton circle className={styles.skeleton} />
  ) 
}

export default LottoBallSkeleton;
