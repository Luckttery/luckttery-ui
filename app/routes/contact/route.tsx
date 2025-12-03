import type { MetaFunction } from "@remix-run/node";
import Paper from "~/components/Paper";
import styles from "./styles.module.scss";

export const meta: MetaFunction = () => {
  return [
    { title: "Luckttery | 문의하기" },
    { name: "description", content: "Luckttery에 궁금한 점이 있으신가요? 언제든지 문의해주세요." },
    { tagName: "link", rel: "canonical", href: "https://luckttery.com/contact" },
    { property: "og:title", content: "Luckttery | 문의하기"},
    { property: "og:description", content: "Luckttery에 궁금한 점이 있으신가요? 언제든지 문의해주세요."},
    { property: "og:url", content: "https://luckttery.com/contact" },
  ];
};

export default function ContactPage() {
  return (
    <div className={styles.container}>
      <Paper elevation={4} className={styles.paper}>
        <h1>문의하기</h1>
        
        <section className={styles.intro}>
          <p>Luckttery 서비스에 대한 문의사항, 제안, 또는 불편한 점이 있으시면 언제든지 연락 주시기 바랍니다.</p>
          <p>여러분의 소중한 의견은 더 나은 서비스를 만드는 데 큰 도움이 됩니다.</p>
        </section>

        <section className={styles.section}>
          <h2>📧 이메일 문의</h2>
          <div className={styles.contactInfo}>
            <p className={styles.email}>
              <a href="mailto:contact@luckttery.com">contact@luckttery.com</a>
            </p>
            <p className={styles.responseTime}>
              <strong>답변 시간:</strong> 영업일 기준 1-3일 이내 답변드립니다.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2>📝 문의 전 확인사항</h2>
          <p>문의하시기 전에 <a href="/#faq">자주 묻는 질문(FAQ)</a>을 먼저 확인해 주세요. 대부분의 궁금증은 FAQ에서 해결하실 수 있습니다.</p>
        </section>

        <section className={styles.section}>
          <h2>💬 문의 유형</h2>
          <div className={styles.inquiryTypes}>
            <div className={styles.inquiryCard}>
              <h3>🐛 버그 신고</h3>
              <p>서비스 이용 중 발견한 오류나 버그를 신고해 주세요.</p>
              <ul>
                <li>발생한 문제 상세 설명</li>
                <li>발생 시간 및 상황</li>
                <li>사용 중인 브라우저 및 기기 정보</li>
                <li>스크린샷 (가능한 경우)</li>
              </ul>
            </div>

            <div className={styles.inquiryCard}>
              <h3>💡 기능 제안</h3>
              <p>새로운 기능에 대한 아이디어나 개선 사항을 제안해 주세요.</p>
              <ul>
                <li>제안하고 싶은 기능 설명</li>
                <li>해당 기능이 필요한 이유</li>
                <li>기대하는 효과</li>
              </ul>
            </div>

            <div className={styles.inquiryCard}>
              <h3>❓ 일반 문의</h3>
              <p>서비스 이용 방법, 정책, 기타 궁금한 사항을 문의해 주세요.</p>
              <ul>
                <li>서비스 이용 관련 질문</li>
                <li>개인정보 처리 관련 문의</li>
                <li>기타 일반적인 질문</li>
              </ul>
            </div>
          </div>
        </section>
      </Paper>
    </div>
  );
}
