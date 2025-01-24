import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGetNumber } from "~/api/lucktteryApi/api";
import Button from "~/components/Button";
import LottoSet from "~/components/LottoSet";
import styles from "./styles.module.scss";

type RecommendNumberProps = {
  setCount: number;
  lowerPercent: number;
  upperPercent: number;
};

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
      {isLoading && <p>로딩 중...</p>}
      {data?.sets.map((set, index) => (
        <LottoSet numbers={set} key={index} />
      ))}

      <Button onClick={() => refetch()}>새로고침</Button>
    </div>
  );
};

export default RecommendNumber;