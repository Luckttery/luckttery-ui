import React, { useState } from "react";
import Button from "~/components/Button";
import InputField from "~/components/InputField";
import { Modal } from "~/components/Modal";
import LottoSet from "~/components/LottoSet";
import LottoBall from "~/components/LottoBall";
import styles from "./styles.module.scss";
import { extractNumbersFromDream, generateLottoSetsFromDream } from "~/data/dreamKeywords";

export const DreamNumberForm = () => {
  const [dreamText, setDreamText] = useState("");
  const [setCount, setSetCount] = useState(5);
  const [isOpen, setIsOpen] = useState(false);
  const [matchedNumbers, setMatchedNumbers] = useState<number[]>([]);
  const [lottoSets, setLottoSets] = useState<number[][]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(5, Number(event.target.value)));
    setSetCount(value);
  }

  const handleDreamTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDreamText(event.target.value);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // 꿈 내용에서 번호 추출
    const numbers = extractNumbersFromDream(dreamText);
    setMatchedNumbers(numbers);
    
    // 로또 세트 생성
    const sets = generateLottoSetsFromDream(numbers, setCount);
    setLottoSets(sets);
    
    setIsOpen(true);
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} method="get" onSubmit={handleSubmit}>
        <div className={styles.dreamInputContainer}>
          <label className={styles.dreamLabel}>
            <span className={styles.labelWithIcon}>
              꿈 내용 입력
              <span className={styles.infoIcon} title="꿈에서 본 사물, 동물, 음식, 행동 등을 자유롭게 적어주세요. 키워드를 분석하여 관련된 번호를 추천해드립니다!">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M6 6.5C6 5.67157 6.67157 5 7.5 5H8.5C9.32843 5 10 5.67157 10 6.5C10 7.05 9.77614 7.54762 9.41421 7.90955L8 9.32376V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  <circle cx="8" cy="11.5" r="0.75" fill="currentColor"/>
                </svg>
              </span>
            </span>
            <span className={styles.dreamDescription}>
              예: 돼지가 나와서 똥을 싸고, 호박을 먹었어요
            </span>
          </label>
          <textarea 
            className={styles.dreamTextarea}
            placeholder="꿈 내용을 자유롭게 입력해주세요..."
            value={dreamText}
            onChange={handleDreamTextChange}
            rows={4}
            required
          />
        </div>
        <InputField 
          type="number" 
          placeholder="세트 수" 
          min={1} 
          max={5} 
          value={setCount} 
          onChange={handleInputChange} 
        />
        <Button type="submit">꿈 해몽 번호 받기</Button>
      </form>
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
      >
        <div className={styles.resultContainer}>
          {matchedNumbers.length > 0 && (
            <div className={styles.matchedNumbers}>
              <h3>꿈에서 찾은 번호들</h3>
              <div className={styles.numberBadges}>
                {matchedNumbers.map(num => (
                  <LottoBall key={num} number={num} />
                ))}
              </div>
              <p className={styles.matchInfo}>
                총 {matchedNumbers.length}개의 번호를 찾았습니다
              </p>
            </div>
          )}
          {matchedNumbers.length === 0 && (
            <div className={styles.noMatch}>
              <p>매칭되는 번호가 없어 랜덤으로 생성했습니다</p>
            </div>
          )}
          <div className={styles.lottoSets}>
            {lottoSets.map((set, index) => (
              <div key={index} className={styles.lottoSetWrapper}>
                <div className={styles.setLabel}>세트 {index + 1}</div>
                <LottoSet numbers={set} />
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default DreamNumberForm;
