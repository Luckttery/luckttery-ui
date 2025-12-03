import type { MetaFunction } from "@remix-run/node";
import Paper from "~/components/Paper";
import styles from "./styles.module.scss";

export const meta: MetaFunction = () => {
  return [
    { title: "Luckttery | 이용약관" },
    { name: "description", content: "Luckttery의 이용약관을 확인하세요." },
    { tagName: "link", rel: "canonical", href: "https://luckttery.com/terms" },
    { property: "og:title", content: "Luckttery | 이용약관"},
    { property: "og:description", content: "Luckttery의 이용약관을 확인하세요."},
    { property: "og:url", content: "https://luckttery.com/terms" },
  ];
};

export default function TermsPage() {
  return (
    <div className={styles.container}>
      <Paper elevation={4} className={styles.paper}>
        <h1>이용약관</h1>
        
        <h2>제1조 (목적)</h2>
        <p>본 약관은 Luckttery(이하 "회사")가 제공하는 로또 정보 제공 서비스 및 관련 제반 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>

        <h2>제2조 (서비스의 제공)</h2>
        <p>회사는 다음과 같은 서비스를 제공합니다.</p>
        <ul>
          <li>로또 당첨 번호 조회 서비스</li>
          <li>로또 번호 생성 및 추천 서비스</li>
          <li>위치 기반 로또 판매점 찾기 서비스</li>
          <li>기타 회사가 추가로 개발하거나 제휴 등을 통해 이용자에게 제공하는 일체의 서비스</li>
        </ul>

        <h2>제3조 (면책조항)</h2>
        <p>1. 회사가 제공하는 로또 번호 생성 및 추천 서비스는 통계적, 확률적 분석에 기반한 참고용 정보일 뿐이며, 당첨을 보장하지 않습니다.</p>
        <p>2. 회사는 이용자가 서비스를 이용하여 기대하는 수익을 얻지 못하거나 상실한 것에 대하여 책임을 지지 않습니다.</p>
        <p>3. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</p>

        <h2>제4조 (이용자의 의무)</h2>
        <p>이용자는 다음 행위를 하여서는 안 됩니다.</p>
        <ul>
          <li>서비스 이용 신청 또는 변경 시 허위 내용의 등록</li>
          <li>타인의 정보 도용</li>
          <li>회사가 게시한 정보의 변경</li>
          <li>회사의 운영을 고의로 방해하는 행위</li>
        </ul>

        <h2>제5조 (저작권의 귀속 및 데이터 출처)</h2>
        <p>1. 회사가 작성한 저작물에 대한 저작권 및 기타 지적재산권은 회사에 귀속됩니다.</p>
        <p>2. 서비스 내에서 제공되는 로또 당첨 결과 및 판매점 위치 정보는 동행복권(dhlottery.co.kr)의 공개 데이터를 기반으로 합니다. 해당 데이터의 저작권은 원저작자에게 있습니다.</p>

        <h2>제6조 (약관의 개정)</h2>
        <p>회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.</p>
        
        <p><br/>부칙<br/>본 약관은 2024년 1월 1일부터 시행합니다.</p>
      </Paper>
    </div>
  );
}
