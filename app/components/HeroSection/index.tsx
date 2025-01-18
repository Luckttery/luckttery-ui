import Intro from "./Intro";
import RecommendOptionForm from "./RecommendOptionForm";
import styles from "./styles.module.scss";

export const HeroSection = () => {
  return (
    <div className={styles.heroSection}>
      <Intro />
      <RecommendOptionForm />
    </div>
  )
}

export default HeroSection;