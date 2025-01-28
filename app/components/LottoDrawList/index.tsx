import { Link } from "@remix-run/react";
import { InfiniteData, QueryKey, useInfiniteQuery } from "@tanstack/react-query";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { FC, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { fetchDraws } from "~/api/lucktteryApi/api";
import { CursorPage, LottoDrawResponse } from "~/api/lucktteryApi/types";
import LottoDraw from "../LottoDraw";
import LottoDrawSkeleton from "../LottoDraw/Skeleton";
import styles from "./styles.module.scss";

type LottoDrawListProps = {
  limit: number
}

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
  const estimateSize = isMobile ? 250 : 180;

  const rowVirtualizer = useWindowVirtualizer({
    count: totalCount,
    estimateSize: () => estimateSize,
    measureElement: (el) => el.getBoundingClientRect().height,
    initialRect: { width: 0, height: estimateSize * limit },
    gap: 16,
    overscan: 10,
  });

  useEffect(() => {
    rowVirtualizer.measure()
  }, [isMobile]);

  useEffect(() => {
    const virtualItems = rowVirtualizer.getVirtualItems();

    if (!virtualItems.length) return;

    const lastItem = virtualItems[virtualItems.length - 1];

    if (
      lastItem.index >= allContents.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    rowVirtualizer.getVirtualItems(),
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  return (
    <div
      style={{
        position: "relative",
        height: rowVirtualizer.getTotalSize(),
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const content = allContents[virtualRow.index]

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
          >
            {content ? (
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