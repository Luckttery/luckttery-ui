import { useEffect, useState } from "react";
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
};

const NaverMap: React.FC<NaverMapProps> = ({ latitude, longitude, markers }: NaverMapProps) => {
  const data = useLoaderData<typeof loader>();
  const [map, setMap] = useState<naver.maps.Map | null>(null);

  useEffect(() => {
    const loadNaverMap = () => {
      if (typeof naver === "undefined" || !naver.maps) {
        console.error("Naver Maps API가 로드되지 않았습니다.");
        return;
      }

      const mapOptions = {
        center: new naver.maps.LatLng(latitude, longitude),
        zoom: 16,
      };

      const mapInstance = new naver.maps.Map("map", mapOptions);
      setMap(mapInstance);
    };

    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${data.ENV.NAVER_MAP_CLIENT_ID}`;
    script.async = true;
    script.onload = loadNaverMap;
    document.body.appendChild(script);

    return () => {
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [latitude, longitude, data.ENV.NAVER_MAP_CLIENT_ID]);

  useEffect(() => {
    if (!map) {
      return
    }

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