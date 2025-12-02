import type { MetaFunction } from "@remix-run/node";
import Paper from "~/components/Paper";
import styles from "./styles.module.scss";

export const meta: MetaFunction = () => {
  return [
    { title: "Luckttery | 개인정보처리방침" },
    { name: "description", content: "Luckttery의 개인정보처리방침을 확인하세요." },
    { tagName: "link", rel: "canonical", href: "https://luckttery.com/privacy" },
    { property: "og:title", content: "Luckttery | 개인정보처리방침"},
    { property: "og:description", content: "Luckttery의 개인정보처리방침을 확인하세요."},
    { property: "og:url", content: "https://luckttery.com/privacy" },
  ];
};

export default function PrivacyPage() {
  return (
    <div className={styles.container}>
      <Paper elevation={4} className={styles.paper}>
        <h1>개인정보처리방침</h1>
        <p><strong>1. 수집하는 개인정보 항목</strong></p>
        <p>Luckttery는 서비스 제공을 위해 다음과 같은 최소한의 개인정보를 수집할 수 있습니다.</p>
        <ul>
          <li>위치 정보: 사용자의 현재 위치를 기반으로 주변 로또 판매점 정보를 제공하기 위해 사용됩니다. 이 정보는 사용자의 명시적인 동의 하에 수집되며, 저장되지 않습니다.</li>
        </ul>
        <p><strong>2. 개인정보의 수집 및 이용 목적</strong></p>
        <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
        <ul>
          <li>주변 로또 판매점 위치 정보 제공</li>
        </ul>
        <p><strong>3. 개인정보의 보유 및 이용기간</strong></p>
        <p>위치 정보는 일회성으로 사용되며, 서버에 저장되지 않습니다.</p>
        <p><strong>4. 개인정보 제공</strong></p>
        <p>Luckttery는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.</p>
        <p><strong>5. 개인정보처리방침 변경</strong></p>
        <p>본 개인정보처리방침은 법령 및 방침에 따라 변경될 수 있으며, 변경 시 공지사항을 통해 고지할 것입니다.</p>
      </Paper>
    </div>
  );
}
