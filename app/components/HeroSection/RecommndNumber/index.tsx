import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { fetchGetNumber } from "~/api/lucktteryApi/api";
import Button from "~/components/Button";
import LottoSet from "~/components/LottoSet";
import LottoSetSkeleton from "~/components/LottoSet/Skeleton";
import styles from "./styles.module.scss";

type RecommendNumberProps = {
  setCount: number;
  lowerPercent: number;
  upperPercent: number;
}

export const RecommendNumber: React.FC<RecommendNumberProps> = ({
  setCount,
  lowerPercent,
  upperPercent,
}) => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["recommendNumber"],
    queryFn: () => fetchGetNumber(setCount, lowerPercent, upperPercent),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        Array.from({ length: setCount }).map((_, index) => (
          <LottoSetSkeleton numberCount={6} hasBonusNumber={false} key={index} />
        ))
      ) : (
        data?.sets.map((set, index) => (
          <LottoSet numbers={set} key={index} />
        ))
      )}
      <Button fullWidth onClick={() => refetch()}>새로고침</Button>
    </div>
  );
}

export default RecommendNumber;