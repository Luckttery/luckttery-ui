import React, { useEffect, useState } from "react";
import NaverMap, { MarkerData } from "~/components/NaverMap";
import styles from "./styles.module.scss"
import { renderToString } from "react-dom/server";
import CurrentMarker from "./CurrentMarker";
import myLocation from "~/assets/my-location.svg";
import { useQuery } from "react-query";
import { fetchStoreList } from "~/api/lucktteryApi/api";
import StoreInfoWindow from "./StoreInfoWindow";

const SEOUL_COORDINATES = { latitude: 37.5665, longitude: 126.9780 } // 기본 서울 좌표

const NearbyStoresMap: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState<{ latitude: number; longitude: number }>();
  const [currentLocationMarker, setCurrentLocationMarker] = useState<MarkerData>({
    ...SEOUL_COORDINATES,
    title: "기본 위치",
    icon: {
      content: renderToString(<CurrentMarker />),
    },
  });

  const [storeMarkers, setStoreMarkers] = useState<MarkerData[]>([]);
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const { data: stores } = useQuery({
    queryKey: ["stores", currentPosition?.latitude, currentPosition?.longitude],
    queryFn: () => fetchStoreList(
      currentPosition?.latitude ?? SEOUL_COORDINATES.latitude,
      currentPosition?.longitude ?? SEOUL_COORDINATES.longitude,
      2
    ),
    enabled: !!currentPosition,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const updateCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setCurrentLocationMarker(
            {
              latitude,
              longitude,
              title: "현재 위치",
              icon: {
                content: renderToString(<CurrentMarker />),
              },
            },
          );
          setCurrentPosition({ latitude: latitude, longitude: longitude });
        },
        (error) => {
          console.error("현 위치 정보를 가져올 수 없습니다:", error.message);
          setCurrentPosition(SEOUL_COORDINATES);
        }
      );
    }
  };

  useEffect(() => {
    updateCurrentPosition();
  }, []);

  useEffect(() => {
    const storeMarkers: MarkerData[] = stores?.map(({ name, address, location, selling_items }) => ({
        latitude: location.coordinates[1],
        longitude: location.coordinates[0],
        title: name,
        infoWindow: {
          anchorSkew: true,
          content: renderToString(<StoreInfoWindow name={name} address={address.full_address} sellingItems={selling_items} />),
          maxWidth: 230,
          backgroundColor: 'rgba(255, 255, 255, 0)',
          borderColor: 'transparent',
        }
      })) ?? []

    setStoreMarkers(storeMarkers);
  }, [stores])

  useEffect(() => {
    setMarkers([currentLocationMarker, ...storeMarkers]);
  }, [currentLocationMarker, storeMarkers])

  return (
    <div>
      <h2>주변 판매점</h2>
      <div className={styles.mapWrapper}>
        <NaverMap
          latitude={currentPosition?.latitude ?? SEOUL_COORDINATES.latitude}
          longitude={currentPosition?.longitude ?? SEOUL_COORDINATES.longitude}
          markers={markers}
        />
        <button className={styles.currentLocationButton} onClick={updateCurrentPosition}>
          <img alt="my-location" src={myLocation} />
        </button>
      </div>
    </div>
  );
};

export default NearbyStoresMap;