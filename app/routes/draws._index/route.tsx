import { MetaFunction, useLoaderData } from "@remix-run/react";
import { dehydrate, HydrationBoundary, InfiniteData, QueryClient, QueryKey } from "@tanstack/react-query";
import { fetchDraws } from "~/api/lucktteryApi/api";
import { CursorPage, LottoDrawResponse } from "~/api/lucktteryApi/types";
import LottoDrawList from "~/components/LottoDrawList";
import styles from "./styles.module.scss";

const LIMIT = 50;

export const meta: MetaFunction = () => {
  return [
    { title: "Luckttery | 로또 당첨번호 모아보기" },
    { name: "description", content: "로또 회차별 당첨번호를 한 곳에서 조회해보세요." },
    { name: "keywords", content: "Luckttery, 로또, 로또645, 로또6/45, 6/45 로또, 로또 당첨번호, 로또 화차별 당첨번호" },
    { property: "og:title", content: "Luckttery | 로또 당첨번호 모아보기"},
    { property: "og:description", content: "로또 회차별 당첨번호를 한 곳에서 조회해보세요."},
    { property: "og:type", content: "website"},
    { property: "og:url", content: "https://luckttery.com" },
    { property: "og:image", content: "https://luckttery.com/android-chrome-512x512.png" }
  ];
};

export const loader = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchInfiniteQuery<
    CursorPage<LottoDrawResponse>,
    Error,
    InfiniteData<CursorPage<LottoDrawResponse>>,
    QueryKey,
    number | undefined
  >({
    queryKey: ["draws"],
    queryFn: ({ pageParam }) => fetchDraws(pageParam, LIMIT, "draw,desc"),
    initialPageParam: undefined
  });
  
  return Response.json({
    dehydratedState: dehydrate(queryClient)
  });
};

export default function Index() {
  const { dehydratedState } = useLoaderData<typeof loader>();

  return (
    <div className={styles.container}>
      <h1>로또 당첨번호 모아보기</h1>
      <HydrationBoundary state={dehydratedState}>
        <LottoDrawList limit={LIMIT} />
      </HydrationBoundary>
    </div>
  );
}