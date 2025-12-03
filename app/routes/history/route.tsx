import type { MetaFunction } from "@remix-run/node";
import styles from "./styles.module.scss";

export const meta: MetaFunction = () => {
  return [
    { title: "세계 로또의 역사 | Luckttery" },
    { name: "description", content: "고대 로마부터 현대의 파워볼까지, 흥미로운 세계 복권의 역사와 문화를 알아보세요." },
    { tagName: "link", rel: "canonical", href: "https://luckttery.com/history" },
    { property: "og:title", content: "세계 로또의 역사 | Luckttery"},
    { property: "og:description", content: "고대 로마부터 현대의 파워볼까지, 흥미로운 세계 복권의 역사와 문화를 알아보세요."},
    { property: "og:url", content: "https://luckttery.com/history" },
  ];
};

const historyData = [
  {
    country: "중국 (China)",
    flag: "🇨🇳",
    period: "BC 205 ~ BC 187",
    title: "만리장성을 쌓은 복권",
    description: "세계 최초의 복권 기록은 중국 한나라 시대로 거슬러 올라갑니다. '키노(Keno)'의 원형이 된 이 게임은 전쟁 자금을 모으고, 만리장성 건설 비용을 충당하는 데 사용되었다고 전해집니다.",
    fact: "당시에는 흰 비둘기를 날려 당첨 번호를 뽑았기 때문에 '백구표(白鳩票)'라고도 불렸습니다."
  },
  {
    country: "로마 (Rome)",
    flag: "🇮🇹",
    period: "BC 100 ~ AD 100",
    title: "황제의 연회와 선물",
    description: "고대 로마의 아우구스투스 황제는 연회 중에 손님들에게 복권을 판매하고, 당첨자에게는 노예나 집 같은 값비싼 경품을 주었습니다. 이는 로마 복구 자금을 마련하기 위한 수단이기도 했습니다.",
    fact: "최초의 금전적 상금이 걸린 복권은 로마 시대에 등장했습니다."
  },
  {
    country: "네덜란드 (Netherlands)",
    flag: "🇳🇱",
    period: "15세기",
    title: "Lottery 어원의 탄생",
    description: "15세기 네덜란드와 벨기에 지역에서는 가난한 사람들을 돕거나 마을 요새를 정비하기 위해 정기적으로 복권을 발행했습니다. '운명'을 뜻하는 네덜란드어 'Lot'에서 현재의 'Lottery'가 유래되었습니다.",
    fact: "1445년 슬로이스(Sluis) 기록에 따르면 4,304장의 티켓을 팔아 1,737 플로린의 상금을 주었다고 합니다."
  },
  {
    country: "영국 (UK)",
    flag: "🇬🇧",
    period: "1566년 ~ 현재",
    title: "엘리자베스 1세의 국영 복권",
    description: "영국 최초의 국영 복권은 엘리자베스 1세 여왕에 의해 승인되었습니다. 항구 수리와 공공 사업 자금을 마련하기 위해 발행되었으며, 당첨자에게는 현금뿐만 아니라 태피스트리, 접시 등의 물품도 지급되었습니다.",
    fact: "당첨자는 처벌을 면제받는 '면책권'을 받기도 했습니다."
  },
  {
    country: "미국 (USA)",
    flag: "🇺🇸",
    period: "18세기 ~ 현재",
    title: "건국의 아버지와 복권",
    description: "미국 건국 초기, 벤자민 프랭클린과 조지 워싱턴은 대포 구매나 도로 건설 등 공공 사업을 위해 복권을 적극적으로 활용했습니다. 하버드, 예일 등 명문 대학들도 초기에는 복권 수익금으로 운영되었습니다.",
    fact: "현재 미국의 '파워볼'은 세계에서 가장 큰 당첨금 규모를 자랑합니다."
  },
  {
    country: "한국 (Korea)",
    flag: "🇰🇷",
    period: "1947년 ~ 현재",
    title: "올림픽 후원권에서 로또까지",
    description: "한국 최초의 복권은 1947년 런던 올림픽 참가 경비를 마련하기 위해 발행된 '올림픽 후원권'입니다. 이후 주택복권, 체육복권 등을 거쳐 2002년 현재의 '로또 6/45'가 도입되었습니다.",
    fact: "초기 주택복권의 1등 당첨금은 300만원이었으며, 당시 서울의 집 한 채 가격이었습니다."
  }
];

export default function HistoryPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>세계 로또의 역사</h1>
        <p>인류의 역사와 함께해 온 행운의 게임,<br/>그 흥미진진한 이야기를 시대별로 만나보세요.</p>
      </div>

      <div className={styles.timeline}>
        {historyData.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardContent}>
              <span className={styles.flag}>{item.flag}</span>
              <span className={styles.period}>{item.period}</span>
              <h2 className={styles.countryName}>{item.country}</h2>
              <h3>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
              <div className={styles.fact}>
                <strong>💡 Did you know?</strong>
                {item.fact}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
