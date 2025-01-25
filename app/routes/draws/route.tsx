import { useLoaderData } from "@remix-run/react";
import { dehydrate, HydrationBoundary, InfiniteData, QueryClient, QueryKey } from "@tanstack/react-query";
import { fetchDraws } from "~/api/lucktteryApi/api";
import { CursorPage, LottoDrawResponse } from "~/api/lucktteryApi/types";
import LottoDrawList from "~/components/LottoDrawList";
import styles from "./styles.module.scss";

const LIMIT = 50;

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
      <h1>로또 당첨 결과</h1>
      <HydrationBoundary state={dehydratedState}>
        <LottoDrawList limit={LIMIT} />
      </HydrationBoundary>
    </div>
  );
}