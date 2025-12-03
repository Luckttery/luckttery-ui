import type { MetaFunction } from "@remix-run/node";
import Paper from "~/components/Paper";
import styles from "./styles.module.scss";

export const meta: MetaFunction = () => {
  return [
    { title: "Luckttery | 소개" },
    { name: "description", content: "Luckttery는 로또 번호 생성과 판매점 정보를 제공하는 서비스입니다. 저희 서비스에 대해 더 알아보세요." },
    { tagName: "link", rel: "canonical", href: "https://luckttery.com/about" },
    { property: "og:title", content: "Luckttery | 소개"},
    { property: "og:description", content: "Luckttery는 로또 번호 생성과 판매점 정보를 제공하는 서비스입니다. 저희 서비스에 대해 더 알아보세요."},
    { property: "og:url", content: "https://luckttery.com/about" },
  ];
};

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <Paper elevation={4} className={styles.paper}>
        <h1>Luckttery 소개</h1>
        
        <section className={styles.section}>
          <h2>우리의 미션</h2>
          <p>Luckttery는 여러분의 로또 경험을 더욱 즐겁고 특별하게 만들어드리기 위해 탄생했습니다. 단순히 번호를 생성하는 것을 넘어, 로또에 대한 모든 정보와 서비스를 한 곳에서 제공하는 종합 플랫폼을 목표로 합니다.</p>
          <p>우리는 사용자들이 더 편리하고 재미있게 로또를 즐길 수 있도록 항상 노력하고 있으며, 데이터 기반의 유용한 인사이트를 제공하기 위해 끊임없이 연구하고 있습니다.</p>
        </section>

        <section className={styles.section}>
          <h2>주요 기능</h2>
          <div className={styles.feature}>
            <h3>🎲 스마트 번호 생성</h3>
            <p>다양한 방식으로 행운의 로또 번호를 생성해 보세요. 랜덤 생성부터, 꿈 해몽 번호까지 여러분만의 특별한 번호를 찾을 수 있습니다.</p>
            <ul>
              <li>완전 무작위 번호 생성</li>
              <li>통계 기반 추천 번호</li>
              <li>꿈 해몽을 통한 번호 생성</li>
              <li>제외 번호 설정 및 커스터마이징</li>
            </ul>
          </div>

          <div className={styles.feature}>
            <h3>📊 당첨 정보 확인</h3>
            <p>최신 회차를 포함한 과거 당첨 번호와 상세 정보를 빠르게 확인하세요. 모든 회차의 데이터를 한눈에 볼 수 있으며, 당첨 통계도 함께 제공됩니다.</p>
            <ul>
              <li>실시간 최신 회차 당첨 번호</li>
              <li>전체 회차 당첨 번호 조회</li>
              <li>당첨금 및 당첨자 수 정보</li>
              <li>번호별 출현 빈도 통계</li>
            </ul>
          </div>

          <div className={styles.feature}>
            <h3>📍 판매점 찾기</h3>
            <p>내 주변의 로또 판매점을 지도에서 쉽게 찾아보세요. 현재 위치 기반으로 가까운 판매점 정보를 제공하며, 상세 정보도 함께 확인할 수 있습니다.</p>
            <ul>
              <li>실시간 위치 기반 판매점 검색</li>
              <li>지도에서 직관적인 판매점 위치 확인</li>
              <li>판매점 상세 정보 (주소, 연락처 등)</li>
              <li>1등 당첨 이력이 있는 판매점 표시</li>
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <h2>왜 Luckttery인가요?</h2>
          <ul className={styles.benefits}>
            <li><strong>무료 서비스:</strong> 모든 기능을 무료로 이용할 수 있습니다. 회원가입 없이도 바로 사용 가능합니다.</li>
            <li><strong>정확한 정보:</strong> 공식 로또 데이터를 기반으로 정확하고 신뢰할 수 있는 정보를 제공합니다.</li>
            <li><strong>사용자 중심:</strong> 직관적인 UI/UX로 누구나 쉽게 사용할 수 있도록 설계되었습니다.</li>
            <li><strong>지속적인 개선:</strong> 사용자 피드백을 반영하여 서비스를 지속적으로 개선하고 있습니다.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>로또 6/45란?</h2>
          <p>로또 6/45는 대한민국에서 가장 인기 있는 복권 게임입니다. 1부터 45까지의 숫자 중 6개의 번호를 선택하여 추첨 번호와 일치하는 정도에 따라 당첨금을 받는 방식입니다.</p>
          <ul>
            <li><strong>추첨일:</strong> 매주 토요일 저녁 8시 35분</li>
            <li><strong>구매 방법:</strong> 전국 로또 판매점 또는 온라인</li>
            <li><strong>가격:</strong> 1게임당 1,000원</li>
            <li><strong>당첨 확률:</strong> 1등 당첨 확률은 약 814만분의 1</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>연락처</h2>
          <p>서비스 이용 중 문의사항이나 제안사항이 있으시면 언제든지 연락 주시기 바랍니다.</p>
          <p>이메일: <a href="mailto:contact@luckttery.com">contact@luckttery.com</a></p>
        </section>

        <section className={styles.disclaimer}>
          <p><small>* Luckttery는 로또 번호 생성 및 정보 제공 서비스로, 당첨을 보장하지 않습니다. 로또는 순수한 확률 게임이며, 책임감 있게 즐기시기 바랍니다.</small></p>
        </section>
      </Paper>
    </div>
  );
}
