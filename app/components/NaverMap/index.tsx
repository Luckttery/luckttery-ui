import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { loader } from "~/routes/_index/route";

export type MarkerIcon = {
  content: string;
  anchor?: { x: number; y: number };
};

export type MarkerInfoWindow = {
  anchorSkew?: boolean
  maxWidth?: number
  backgroundColor?: string
  borderColor?: string
}

export type MarkerData = {
  latitude: number;
  longitude: number;
  title?: string;
  icon?: MarkerIcon;
  infoWindow?: MarkerInfoWindow;
};

type NaverMapProps = {
  latitude: number;
  longitude: number;
  markers?: MarkerData[];
  onCenterChanged?: (latitude: number, longitude: number) => void;
};

const NaverMap: React.FC<NaverMapProps> = ({ latitude, longitude, markers, onCenterChanged }: NaverMapProps) => {
  const data = useLoaderData<typeof loader>();
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const isInitializingRef = useRef(false);
  const markerInstancesRef = useRef<naver.maps.Marker[]>([]);
  const dragEndListenerRef = useRef<naver.maps.MapEventListener | null>(null);

  useEffect(() => {
    const ensureNaverMapsLoaded = async () => {
      if (typeof window === "undefined") {
        return;
      }

      if (typeof naver !== "undefined" && naver.maps) {
        return;
      }

      await new Promise<void>((resolve, reject) => {
        const existing = document.querySelector<HTMLScriptElement>('script[data-naver-maps="true"]');
        if (existing) {
          existing.addEventListener("load", () => resolve(), { once: true });
          existing.addEventListener("error", () => reject(new Error("Naver Maps script load failed")), { once: true });
          return;
        }

        const script = document.createElement("script");
        script.dataset.naverMaps = "true";
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${data.ENV.NAVER_MAP_CLIENT_ID}`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Naver Maps script load failed"));
        document.body.appendChild(script);
      });
    };

    const initMap = async () => {
      if (isInitializingRef.current) {
        return;
      }

      isInitializingRef.current = true;
      try {
        await ensureNaverMapsLoaded();
      } catch (error) {
        console.error("Naver Maps API가 로드되지 않았습니다.", error);
        isInitializingRef.current = false;
        return;
      }

      if (typeof naver === "undefined" || !naver.maps) {
        console.error("Naver Maps API가 로드되지 않았습니다.");
        isInitializingRef.current = false;
        return;
      }

      const mapInstance = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(latitude, longitude),
        zoom: 16,
      });

      setMap(mapInstance);
      isInitializingRef.current = false;
    };

    if (!map) {
      void initMap();
    }
  }, [data.ENV.NAVER_MAP_CLIENT_ID, latitude, longitude, map]);

  useEffect(() => {
    if (!map) {
      return;
    }

    map.setCenter(new naver.maps.LatLng(latitude, longitude));
  }, [map, latitude, longitude]);

  useEffect(() => {
    if (!map) {
      return;
    }

    if (dragEndListenerRef.current) {
      naver.maps.Event.removeListener(dragEndListenerRef.current);
      dragEndListenerRef.current = null;
    }

    if (!onCenterChanged) {
      return;
    }

    dragEndListenerRef.current = naver.maps.Event.addListener(map, "dragend", () => {
      const center = map.getCenter();
      onCenterChanged(center.y, center.x);
    });

    return () => {
      if (dragEndListenerRef.current) {
        naver.maps.Event.removeListener(dragEndListenerRef.current);
        dragEndListenerRef.current = null;
      }
    };
  }, [map, onCenterChanged]);

  useEffect(() => {
    if (!map) {
      return
    }

    markerInstancesRef.current.forEach((marker) => marker.setMap(null));
    markerInstancesRef.current = [];

    markers?.forEach((marker) => {
      const position = new naver.maps.LatLng(marker.latitude, marker.longitude);
      const icon = marker.icon
        ? {
            content: marker.icon.content,
            anchor: marker.icon.anchor
              ? new naver.maps.Point(marker.icon.anchor.x, marker.icon.anchor.y)
              : undefined,
          }
        : undefined;

      const mapMarker = new naver.maps.Marker({
        position,
        map: map,
        title: marker.title,
        icon,
      });

      markerInstancesRef.current.push(mapMarker);

      if (marker.infoWindow) {
        const infoWindow = new naver.maps.InfoWindow(marker.infoWindow as naver.maps.InfoWindowOptions);
        naver.maps.Event.addListener(mapMarker, 'mouseover', () => infoWindow.open(map, mapMarker.getPosition()));
        naver.maps.Event.addListener(mapMarker, 'mouseout', () => infoWindow.close());
        naver.maps.Event.addListener(mapMarker, 'click', () => infoWindow.open(map, mapMarker.getPosition()));
      }
    });
  }, [map, markers]);

  return <div id="map" style={{ width: "100%", height: "100%", zIndex: 1 }} />;
};

export default NaverMap;
