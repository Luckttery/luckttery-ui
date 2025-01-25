import { InfiniteData, QueryKey, useInfiniteQuery } from "@tanstack/react-query";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { FC, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { fetchDraws } from "~/api/lucktteryApi/api";
import { CursorPage, LottoDrawResponse } from "~/api/lucktteryApi/types";
import LottoDraw from "../LottoDraw";
import LottoDrawSkeleton from "../LottoDraw/Skeleton";

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
  const rowVirtualizer = useWindowVirtualizer({
    count: 1156, //FIXME 백엔드 총 개수 응답 추가 후 수정
    estimateSize: () => (isMobile ? 250 : 180),
    measureElement: (el) => el.getBoundingClientRect().height,
    initialRect: { width: 0, height: 800 },
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

    const allContents = data?.pages.flatMap((page) => page.contents) ?? [];

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
        const content = data?.pages.flatMap((page) => page.contents).at(virtualRow.index)

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
            {content ? <LottoDraw {...content} /> : <LottoDrawSkeleton/>}
          </div>
        );
      })}
    </div>
  )
}

export default LottoDrawList;