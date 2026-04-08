import { Link } from "@remix-run/react";
import { InfiniteData, QueryKey, useInfiniteQuery } from "@tanstack/react-query";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { FC, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { fetchDraws } from "~/api/lucktteryApi/api";
import { CursorPage, LottoDrawResponse } from "~/api/lucktteryApi/types";
import GoogleAdSense from "../GoogleAdSense";
import LottoDraw from "../LottoDraw";
import LottoDrawSkeleton from "../LottoDraw/Skeleton";
import styles from "./styles.module.scss";

type LottoDrawListProps = {
  limit: number
}

const AD_FREQUENCY = 10;
const AD_SLOT = "9394671723";
const AD_ROW_HEIGHT = 140;

const getAdCount = (drawCount: number) => Math.floor(Math.max(drawCount - 1, 0) / AD_FREQUENCY);

const getVirtualRowCount = (drawCount: number) => drawCount + getAdCount(drawCount);

const isAdRow = (virtualIndex: number) => (virtualIndex + 1) % (AD_FREQUENCY + 1) === 0;

const getDrawIndexFromVirtualIndex = (virtualIndex: number) => {
  const adRowsBefore = Math.floor((virtualIndex + 1) / (AD_FREQUENCY + 1));

  return virtualIndex - adRowsBefore;
};

export const LottoDrawList: FC<LottoDrawListProps> = ({ limit }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<
    CursorPage<LottoDrawResponse>,
    Error,
    InfiniteData<CursorPage<LottoDrawResponse>>,
    QueryKey,
    number | undefined
  >({
    queryKey: ["draws"],
    queryFn: ({ pageParam }) => fetchDraws(pageParam, limit, "draw,desc"),
    getNextPageParam: (lastGroup) => lastGroup.next_cursor ?? undefined,
    initialPageParam: undefined,
  });

  const totalCount = data?.pages?.at(0)?.total_count ?? 0;
  const allContents = data?.pages.flatMap((page) => page.contents) ?? [];
  const drawEstimateSize = isMobile ? 250 : 180;
  const virtualRowCount = getVirtualRowCount(totalCount);

  const rowVirtualizer = useWindowVirtualizer({
    count: virtualRowCount,
    estimateSize: (index) => isAdRow(index) ? AD_ROW_HEIGHT : drawEstimateSize,
    measureElement: (el) => el.getBoundingClientRect().height,
    initialRect: { width: 0, height: drawEstimateSize * limit },
    gap: 16,
    overscan: 10,
  });
  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    rowVirtualizer.measure()
  }, [isMobile, rowVirtualizer]);

  useEffect(() => {
    if (!virtualItems.length) return;

    const lastDrawItem = [...virtualItems].reverse().find((item) => !isAdRow(item.index));

    if (!lastDrawItem) return;

    if (
      getDrawIndexFromVirtualIndex(lastDrawItem.index) >= allContents.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    allContents.length,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    rowVirtualizer,
    virtualItems,
  ]);

  return (
    <div
      style={{
        position: "relative",
        height: rowVirtualizer.getTotalSize(),
      }}
    >
      {virtualItems.map((virtualRow) => {
        const adRow = isAdRow(virtualRow.index);
        const drawIndex = getDrawIndexFromVirtualIndex(virtualRow.index);
        const content = allContents[drawIndex];

        return (
          <div
            key={virtualRow.key}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualRow.start}px)`,
            }}
            data-index={virtualRow.index}
            ref={rowVirtualizer.measureElement}
          >
            {adRow ? (
              <div className={styles.adContainer}>
                <GoogleAdSense
                  className={styles.ad}
                  slot={AD_SLOT}
                  format="auto"
                  responsive="true"
                  style={{ width: "100%", height: `${AD_ROW_HEIGHT}px` }}
                />
              </div>
            ) : content ? (
              <Link className={styles.link} to={`/draws/${content.draw}`}>
                <LottoDraw {...content} />
              </Link>
            ) : <LottoDrawSkeleton/>}
          </div>
        );
      })}
    </div>
  )
}

export default LottoDrawList;
