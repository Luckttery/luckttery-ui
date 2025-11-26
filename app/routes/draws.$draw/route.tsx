import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { HttpStatusCode } from 'axios';
import { fetchDraw } from "~/api/lucktteryApi/api";
import LottoSet from "~/components/LottoSet";
import styles from "./styles.module.scss";
import Paper from "~/components/Paper";
import { PrizeTable } from "~/components/PrizeTable";
import ComingSoon from "~/components/ComingSoon";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { draw: drawParam } = params;

  if (!drawParam) {
    throw new Response("Not Found", { status: 404 })
  }

  const queryClient = new QueryClient();
  const draw = parseInt(drawParam, 10);

  try {
    const result = await queryClient.fetchQuery({
      queryKey: ['draw', draw],
      queryFn: () => fetchDraw(Number(draw)),
    })
  } catch (err: any) {
    if (err.isAxiosError) {
      throw new Response(err.response?.data, { status: err.response?.status, statusText: 'Not Found' });
    } else {
      throw new Response(null, { status: HttpStatusCode.BadGateway, statusText: 'Bad Gateway' });
    }
  }

  return Response.json({
    draw: draw,
    dehydratedState: dehydrate(queryClient),
  });
}

export const meta: MetaFunction<typeof loader> = ({
  data,
}) => {
  return [
    { title: `Luckttery | ${data.draw}회차 당첨 결과` },
    { name: "description", content: `로또 ${data.draw}회차 당첨 결과를 확인해보세요.` },
    { name: "keywords", content: `Luckttery, 로또, 로또645, 로또6/45, 6/45 로또, 당첨 결과, 로또 ${data.draw}회차, ${data.draw}회차 당첨 결과` },
    { tagName: "link", rel: "canonical", href: `https://luckttery.com/draws/${data.draw}` },
    { property: "og:title", content: `Luckttery | ${data.draw}회차 당첨 결과` },
    { property: "og:description", content: `로또 ${data.draw}회차 당첨 결과를 확인해보세요.` },
    { property: "og:type", content: "website"},
    { property: "og:url", content: `https://luckttery.com/draws/${data.draw}` },
    { property: "og:image", content: "https://luckttery.com/android-chrome-512x512.png" },
    { property: "og:site_name", content: "Luckttery" },
    { property: "og:locale", content: "ko_KR" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `Luckttery | ${data.draw}회차 당첨 결과` },
    { name: "twitter:description", content: `로또 ${data.draw}회차 당첨 결과를 확인해보세요.` },
    { name: "twitter:image", content: "https://luckttery.com/android-chrome-512x512.png" }
  ];
};

export const DrawDetailPage = () => {
  const { draw } = useLoaderData<typeof loader>();
  const { data: drawDetail } = useQuery({
    queryKey: ['draw', draw],
    queryFn: () => fetchDraw(Number(draw)),
  })

  return (
    <div className={styles.container}>
      <h1>{drawDetail!.draw}회차 당첨 결과</h1>
      <p>추첨일자: {drawDetail!.date.toString()}</p>
      <Paper className={styles.margin} elevation={4}>
        <h2>당첨 번호</h2>
        <div className={styles.lottoSet}>
          <LottoSet numbers={drawDetail!.numbers} bonusNumber={drawDetail!.bonus_number} />
        </div>
      </Paper>
      <Paper className={styles.margin} elevation={4}>
        <h2>등수별 당첨금</h2>
        <PrizeTable {...drawDetail!} />
      </Paper>
      <Paper className={styles.margin} elevation={4}>
        <h2>1등 판매점</h2>
        <ComingSoon />
      </Paper>
      <Paper className={styles.margin} elevation={4}>
        <h2>2등 판매점</h2>
        <ComingSoon />
      </Paper>
    </div>
  )
}

export default DrawDetailPage;