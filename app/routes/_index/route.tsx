import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchLatest } from "~/api/lucktteryApi/api";
import Intro from "~/components/HeroSection/Intro";
import RecommendOptionForm from "~/components/HeroSection/RecommendOptionForm";
import LatestDrawSection from "~/components/LatestDrawSection";
import NearbyStoresMap from "~/components/NearByStoresMap";
import Paper from "~/components/Paper";
import styles from "./styles.module.scss";

export const meta: MetaFunction = () => {
  return [
    { title: "Luckttery | 로또 번호 & 로또 판매점 찾기" },
    { name: "description", content: "Luckttery에서 로또 번호를 특별하게 생성하고, 지난 회차 당첨 번호를 확인하며, 로또 판매점 위치를 지도에서 찾아보세요!" },
    { name: "keywords", content: "Luckttery, 로또, 6/45 로또, 로또 번호 생성, 로또 판매점 찾기, 로또 판매점 조회, 로또 번호, 로또 당첨 번호, 로또 지도, 로또 판매점 지도" },
    { property: "og:title", content: "Luckttery | 로또 번호 & 로또 판매점 찾기"},
    { property: "og:description", content: "Luckttery에서 로또 번호를 특별하게 생성하고, 지난 회차 당첨 번호를 확인하며, 로또 판매점 위치를 지도에서 찾아보세요!"},
    { property: "og:type", content: "website"},
    { property: "og:url", content: "https://luckttery.com" },
    { property: "og:image", content: "https://luckttery.com/android-chrome-512x512.png" }
  ];
};

export const loader = async () => {
  const latestDraw = await fetchLatest()
  
  return Response.json({
    ENV: {
      NAVER_MAP_CLIENT_ID: process.env.NAVER_MAP_CLIENT_ID,
    },
    latestDraw: latestDraw
  });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const { latestDraw } = data;

  return (
    <div className={styles.container}>
      <Intro title="당신의 행운 로또 도우미" subtitle="행운의 번호 생성, 당첨 결과 확인, 판매점 찾기까지 모두 한 곳에서!" />
      <Paper elevation={4} className={styles.marginBottom}>
        <RecommendOptionForm />
      </Paper>
      <Paper elevation={4} className={styles.marginBottom}>
        <LatestDrawSection draw={latestDraw} />
      </Paper>
      <NearbyStoresMap />
    </div>
  );
}



