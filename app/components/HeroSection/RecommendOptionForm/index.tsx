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

  return (
    <div className={styles.container}>
      <form className={styles.form} method="get" onSubmit={handleSubmit}>
        <InputField type="number" placeholder="세트 수" min={1} max={5} value={setCount} onChange={handleInputChange} />
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