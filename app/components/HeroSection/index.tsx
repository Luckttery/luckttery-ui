import { useState } from "react";
import Intro from "./Intro";
import RecommendOptionForm from "./RecommendOptionForm";
import DreamNumberForm from "./DreamNumberForm";
import styles from "./styles.module.scss";

export const HeroSection = () => {
  const [mode, setMode] = useState<'recommend' | 'dream'>('recommend');

  return (
    <div className={styles.heroSection}>
      <Intro title="당신의 행운 로또 도우미" subtitle="행운의 번호 생성, 당첨 결과 확인, 판매점 찾기까지 모두 한 곳에서!" />
      <div className={styles.modeSelector}>
        <button 
          className={`${styles.modeButton} ${mode === 'recommend' ? styles.active : ''}`}
          onClick={() => setMode('recommend')}
        >
          번호 추천
        </button>
        <button 
          className={`${styles.modeButton} ${mode === 'dream' ? styles.active : ''}`}
          onClick={() => setMode('dream')}
        >
          꿈 해몽
        </button>
      </div>
      {mode === 'recommend' ? <RecommendOptionForm /> : <DreamNumberForm />}
    </div>
  )
}

export default HeroSection;