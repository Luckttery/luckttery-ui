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

      <div className={styles.infoSection}>
        <h2 className={styles.infoTitle}>📚 자주 찾는 꿈 해몽 숫자</h2>
        <div className={styles.dreamTable}>
          <div className={styles.dreamRow}>
            <span className={styles.dreamKeyword}>🐷 돼지</span>
            <span className={styles.dreamDesc}>재물과 행운의 상징</span>
            <span className={styles.dreamNumbers}>8, 12, 24, 33</span>
          </div>
          <div className={styles.dreamRow}>
            <span className={styles.dreamKeyword}>💩 똥/배설물</span>
            <span className={styles.dreamDesc}>금전운 상승</span>
            <span className={styles.dreamNumbers}>2, 9, 15, 28</span>
          </div>
          <div className={styles.dreamRow}>
            <span className={styles.dreamKeyword}>🔥 불</span>
            <span className={styles.dreamDesc}>사업 번창, 재산 증식</span>
            <span className={styles.dreamNumbers}>4, 19, 23, 41</span>
          </div>
          <div className={styles.dreamRow}>
            <span className={styles.dreamKeyword}>🐍 뱀</span>
            <span className={styles.dreamDesc}>지혜, 태몽, 재물</span>
            <span className={styles.dreamNumbers}>6, 14, 25, 44</span>
          </div>
          <div className={styles.dreamRow}>
            <span className={styles.dreamKeyword}>🌊 물</span>
            <span className={styles.dreamDesc}>맑은 물은 재물운</span>
            <span className={styles.dreamNumbers}>1, 10, 29, 38</span>
          </div>
          <div className={styles.dreamRow}>
            <span className={styles.dreamKeyword}>✈️ 비행기</span>
            <span className={styles.dreamDesc}>상승, 여행, 변화</span>
            <span className={styles.dreamNumbers}>5, 16, 30, 42</span>
          </div>
        </div>
        <p className={styles.dreamNote}>* 위 숫자는 통상적인 해몽에 기반한 예시이며, 실제 분석 결과와 다를 수 있습니다.</p>
      </div>
    </div>
  );
}
