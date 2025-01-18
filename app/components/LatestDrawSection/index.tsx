import { LottoDrawResponse } from "~/api/lucktteryApi/types";
import styles from "./styles.module.scss";
import LottoSet from "../LottoSet";

type LatestDrawSectionProps = {
  draw: LottoDrawResponse
}

export const LatestDrawSection: React.FC<LatestDrawSectionProps> = ({ draw }: LatestDrawSectionProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <span className={styles.highlight}>{draw.draw}회</span> 당첨 번호
      </h2>
      <LottoSet numbers={draw.numbers} bonusNumber={draw.bonus_number} />
    </div>
  )
}

export default LatestDrawSection;