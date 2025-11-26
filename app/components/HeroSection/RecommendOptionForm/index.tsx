import React, { useState } from "react";
import { Range } from "react-range";
import Button from "~/components/Button";
import InputField from "~/components/InputField";
import { Modal } from "~/components/Modal";
import styles from "./styles.module.scss";
import RecommendNumber from "../RecommndNumber";

const STEP = 10
const MIN = 0
const MAX = 100

export const RecommendOptionForm = () => {
  const [medianRange, setMedianRange] = useState([0, 100]);
  const [setCount, setSetCount] = useState(5);
  const [isOpen, setIsOpen] = useState(false);

  const handleRangeChange = (values: number[]) => {
    setMedianRange(values)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(5, Number(event.target.value)));
    setSetCount(value);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsOpen(true)
  }

  const getExcludedCount = (percent: number) => {
    return Math.round(45 * percent / 100);
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} method="get" onSubmit={handleSubmit}>
        <InputField type="number" placeholder="세트 수" min={1} max={5} value={setCount} onChange={handleInputChange} />
        <div className={styles.rangeContainer}>
          <label className={styles.rangeLabel}>
            <span className={styles.labelWithIcon}>
              번호 선택 범위
              <span className={styles.infoIcon} title="왼쪽 끝: 지금까지 가장 안 나온 번호들 | 오른쪽 끝: 지금까지 가장 많이 나온 번호들 | 슬라이더로 선택한 범위의 번호들이 추첨할 때 더 자주 등장해요!">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M6 6.5C6 5.67157 6.67157 5 7.5 5H8.5C9.32843 5 10 5.67157 10 6.5C10 7.05 9.77614 7.54762 9.41421 7.90955L8 9.32376V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  <circle cx="8" cy="11.5" r="0.75" fill="currentColor"/>
                </svg>
              </span>
            </span>
            <span className={styles.rangeDescription}>
              {medianRange[0] === 0 && medianRange[1] === 100 
                ? "전체 번호가 추첨에 골고루 등장해요" 
                : medianRange[0] === 0 && medianRange[1] < 100
                ? `잘 안 나온 ${getExcludedCount(medianRange[1])}개 번호가 추첨에 더 자주 등장해요`
                : medianRange[0] > 0 && medianRange[1] === 100
                ? `자주 나온 ${45 - getExcludedCount(medianRange[0])}개 번호가 추첨에 더 자주 등장해요`
                : `중간 정도 나온 ${45 - getExcludedCount(medianRange[0]) - getExcludedCount(100 - medianRange[1])}개 번호가 추첨에 더 자주 등장해요`}
            </span>
          </label>
        </div>
        <Range
          step={STEP}
          min={MIN}
          max={MAX}
          values={medianRange}
          onChange={handleRangeChange}
          renderTrack={({ props, children }) => {
            const [min, max] = medianRange;
            const trackLeft = ((min - MIN) / (MAX - MIN)) * 100
            const trackWidth = ((max - min) / (MAX - MIN)) * 100
            return (
              <div className={styles.rangeTrack} {...props}>
                <div className={styles.rangeSelectedTrack} style={{ left: `${trackLeft}%`, width: `${trackWidth}%` }}  />
                {children}
              </div>
            )
          }}
          renderThumb={({ props, index }) => (
            <div className={styles.rangeThumb} {...props} key={index}>
              <div className={styles.rangeThumbLabel}>{medianRange[index]}</div>
            </div>
          )}
        />
        <Button type="submit">번호 추천 받기</Button>
      </form>
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
      >
        <RecommendNumber setCount={setCount} lowerPercent={medianRange[0]} upperPercent={medianRange[1]} />
      </Modal>
    </div>
  )
}

export default RecommendOptionForm;