import type { MetaFunction } from "@remix-run/node";
import DreamNumberForm from "~/components/HeroSection/DreamNumberForm";
import Paper from "~/components/Paper";
import styles from "./styles.module.scss";

export const meta: MetaFunction = () => {
  return [
    { title: "꿈 해몽 번호 추천 | Luckttery" },
    { name: "description", content: "꿈에서 본 내용을 입력하면 관련된 로또 번호를 추천해드립니다!" },
    { name: "keywords", content: "꿈 해몽, 로또 번호, 꿈 로또, 꿈 번호, 로또 추천" },
    { tagName: "link", rel: "canonical", href: "https://luckttery.com/dream" },
    { property: "og:title", content: "꿈 해몽 번호 추천 | Luckttery"},
    { property: "og:description", content: "꿈에서 본 내용을 입력하면 관련된 로또 번호를 추천해드립니다!"},
    { property: "og:type", content: "website"},
    { property: "og:url", content: "https://luckttery.com/dream" },
  ];
};

export default function Dream() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>💭 꿈 해몽 번호 추천</h1>
        <p className={styles.subtitle}>
          꿈에서 본 사물, 동물, 음식, 행동 등을 입력하면<br />
          관련된 로또 번호를 추천해드립니다!
        </p>
      </div>
      <Paper elevation={4} className={styles.paper}>
        <DreamNumberForm />
      </Paper>
      <div className={styles.infoSection}>
        <h2 className={styles.infoTitle}>💡 이렇게 사용해보세요</h2>
        <ul className={styles.infoList}>
          <li>꿈에 나온 사물, 동물, 음식 등을 자유롭게 적어주세요</li>
          <li>예: "돼지가 똥을 싸고, 호박을 먹었어요"</li>
          <li>키워드를 분석하여 관련 번호를 찾아드립니다</li>
          <li>매칭된 번호들로 로또 세트를 자동 생성합니다</li>
        </ul>
      </div>
    </div>
  );
}
