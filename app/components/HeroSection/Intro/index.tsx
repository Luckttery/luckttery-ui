import React from "react";
import styles from "./styles.module.scss";

type IntroProps = {
  title: string
  subtitle: string
}

export const Intro: React.FC<IntroProps> = ({ title, subtitle }) => {
  return (
    <div className={styles.introContainer}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  )
}

export default Intro;