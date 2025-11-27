import { useState } from "react";
import styles from "./styles.module.scss";

interface FAQItemData {
  question: string;
  answer: string;
}

const faqData: FAQItemData[] = [
  {
    question: "로또 번호는 어떻게 생성되나요?",
    answer: "통계 분석과 랜덤 알고리즘을 결합하여 1부터 45까지의 숫자 중 6개를 선택합니다. 과거 당첨 번호 패턴을 참고하여 다양한 조합을 생성합니다."
  },
  {
    question: "번호 선택 범위 슬라이더는 어떻게 사용하나요?",
    answer: "슬라이더를 조정하여 과거 출현 빈도를 기준으로 번호 범위를 선택할 수 있습니다. 왼쪽 끝은 지금까지 가장 안 나온 번호들, 오른쪽 끝은 가장 많이 나온 번호들을 나타냅니다. 슬라이더로 선택한 범위의 번호들이 추천 시 더 자주 등장합니다."
  },
  {
    question: "최대 몇 세트까지 번호를 추천받을 수 있나요?",
    answer: "한 번에 최대 5세트까지 로또 번호를 추천받을 수 있습니다. 각 세트는 서로 다른 조합으로 생성됩니다."
  },
  {
    question: "추천 번호로 당첨 확률이 높아지나요?",
    answer: "로또는 모든 번호 조합이 동일한 확률(약 1/8,145,060)을 가집니다. 이 서비스는 번호 선택에 도움을 드리는 참고용 도구입니다."
  },
  {
    question: "판매점 찾기 기능은 어떻게 사용하나요?",
    answer: "지도에서 현재 위치를 기반으로 주변 로또 판매점을 확인할 수 있습니다. 위치 권한을 허용하시면 가까운 판매점을 쉽게 찾을 수 있습니다."
  },
  {
    question: "서비스 이용은 무료인가요?",
    answer: "네, 모든 기능을 완전히 무료로 이용하실 수 있습니다. 로그인이나 회원가입 없이도 사용 가능합니다."
  },
  {
    question: "당첨 번호는 언제 업데이트되나요?",
    answer: "매주 토요일 추첨 후 당첨 번호가 확정되면 자동으로 업데이트됩니다. 최신 회차의 당첨 번호와 당첨금 정보를 확인하실 수 있습니다."
  },
  {
    question: "꿈 해몽 번호는 어떻게 생성되나요?",
    answer: "꿈 키워드를 입력하면 해당 키워드와 관련된 행운의 번호로 변환하여 로또 번호를 생성합니다. 꿈의 의미와 연결된 특별한 조합을 추천받을 수 있습니다."
  },
  {
    question: "과거 당첨 번호는 몇 회차까지 조회할 수 있나요?",
    answer: "로또 6/45가 시작된 제1회차부터 최신 회차까지 모든 당첨 번호 기록을 조회하실 수 있습니다."
  },
  {
    question: "같은 번호가 여러 세트에 중복될 수 있나요?",
    answer: "네, 각 세트는 독립적으로 생성되므로 일부 번호가 여러 세트에 중복되어 나타날 수 있습니다."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faqContainer}>
      <h2 className={styles.title}>자주 묻는 질문</h2>
      <div className={styles.faqList}>
        {faqData.map((item, index) => (
          <div key={index} className={styles.faqItem}>
            <button
              className={`${styles.question} ${openIndex === index ? styles.active : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <span className={styles.questionText}>Q. {item.question}</span>
              <span className={styles.icon}>{openIndex === index ? '−' : '+'}</span>
            </button>
            <div className={`${styles.answer} ${openIndex === index ? styles.open : ''}`}>
              <p>A. {item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
