import { useCallback, useEffect, useState } from 'react'
import { fetchStoreList } from '../../api/lucktteryApi/api'
import { StoreInfo } from '../../api/lucktteryApi/types'
import { CurrentLocationButton, MapContainer, Title } from './style'
import Lotto645Icon from '../../assets/ico_seller_645.png';
import Lotto520Icon from '../../assets/ico_seller_720.png';
import SpeetoIcon from '../../assets/ico_seller_speetto.png';
import {ReactComponent as LocationIcon} from '../../assets/my-location.svg';

const SEOUL_COORDINATES = { latitude: 37.5665, longitude: 126.9780 } // 기본 서울 좌표

declare global {
  interface Window {
    naver: any
  }
}

function decodeHTMLEntities(text: string) {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(text, "text/html").documentElement.textContent;
  return decodedString;
}

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState<{ latitude: number; longitude: number } | null>(null)
  const [storeData, setStoreData] = useState<StoreInfo[]>([])
  const [map, setMap] = useState<naver.maps.Map>()

  // Naver Maps API 스크립트 동적으로 추가
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}`;
    script.async = true;
    document.head.appendChild(script);
  
    script.onload = () => {
      console.log('Naver Maps script loaded');
    };
  
    return () => {
      document.head.removeChild(script); // 컴포넌트가 언마운트되면 스크립트를 제거합니다.
    };
  }, []);

  useEffect(() => {
    const { naver } = window;
  
    if (!naver) {
      console.log('Naver maps not loaded');
      return;
    }
  
    if (!map) {
      const mapOptions = {
        center: new naver.maps.LatLng(SEOUL_COORDINATES.latitude, SEOUL_COORDINATES.longitude),
        zoom: 18,
      };
  
      const newMap = new naver.maps.Map('map', mapOptions);
      setMap(newMap);
    }
  }, [map]);

  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ latitude, longitude });
  
          if (map) {
            map.setCenter(new naver.maps.LatLng(latitude, longitude));
          }
        },
        (error) => {
          console.error('Error fetching location: ', error);
          setCurrentPosition(SEOUL_COORDINATES);
  
          if (map) {
            map.setCenter(new naver.maps.LatLng(SEOUL_COORDINATES.latitude, SEOUL_COORDINATES.longitude));
          }
        }
      );
    } else {
      setCurrentPosition(SEOUL_COORDINATES);
  
      if (map) {
        map.setCenter(new naver.maps.LatLng(SEOUL_COORDINATES.latitude, SEOUL_COORDINATES.longitude));
      }
    }
  }, [map]);
  
  useEffect(() => {
    getCurrentLocation(); // 컴포넌트가 처음 렌더링될 때 현재 위치를 가져옵니다.
  }, [getCurrentLocation])

  // 상점 정보 가져오기
  useEffect(() => {
    if (currentPosition) {
      const fetchStores = async () => {
        try {
          const response = await fetchStoreList(
            currentPosition.latitude,
            currentPosition.longitude,
            2 // 검색 반경 설정 (예: 2km)
          );
          setStoreData(response);
        } catch (error) {
          console.error('Error fetching locations:', error);
        }
      };
  
      fetchStores();
    }
  }, [currentPosition])

  // 지도 생성 및 마커 추가
  useEffect(() => {
    if (!currentPosition || storeData.length === 0) return;
  
    const { naver } = window;
  
    if (!naver) {
      console.log('Naver maps not loaded');
      return;
    }
  
    if (!map) {
      // 지도 초기화는 최초 1회만 실행
      const mapOptions = {
        center: new naver.maps.LatLng(currentPosition.latitude, currentPosition.longitude),
        zoom: 18,
      };
  
      const newMap = new naver.maps.Map('map', mapOptions);
      setMap(newMap);
  
      // 현재 위치 마커 추가
      new naver.maps.Marker({
        position: new naver.maps.LatLng(currentPosition.latitude, currentPosition.longitude),
        map: newMap,
        icon: {
          content:
            '<div style="width: 16px; height: 16px; background: red; border-radius: 50%; border: 2px solid white;"></div>',
          anchor: new naver.maps.Point(12, 12),
        },
      });
    }
  
    // 상점 마커 추가
    const infoWindow = new naver.maps.InfoWindow({
      anchorSkew: true,
      maxWidth: 230,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      borderColor: 'transparent',
    });
  
    storeData.forEach((store) => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(store.location.coordinates[1], store.location.coordinates[0]),
        map: map,
      });
  
      const showInfoWindow = () => {
        const icons = [];
        if (store.selling_items.sells_annuity) icons.push(Lotto645Icon);
        if (store.selling_items.sells_lotto) icons.push(Lotto520Icon);
        if (
          store.selling_items.sells_speeto_500 ||
          store.selling_items.sells_speeto_1000 ||
          store.selling_items.sells_speeto_2000
        ) {
          icons.push(SpeetoIcon);
        }
  
        const iconElements = icons
          .map(
            (icon) =>
              `<img src="${icon}" alt="Lottery Icon" style="width: 58px; height: 14px; margin-right: 5px;"/>`
          )
          .join('');
  
        infoWindow.setContent(`
          <div style="padding: 10px; font-family: sans-serif; border: 1px solid #ccc; border-radius: 10px; background-color: white;">
            <div style="font-size: 16px; font-weight: bold; margin-bottom: 5px;">${store.name}</div>
            <div style="font-size: 14px; margin-bottom: 5px;">${decodeHTMLEntities(
              store.address.full_address
            )}</div>
            <div style="display: flex; align-items: center;">${iconElements}</div>
          </div>
        `);
  
        infoWindow.open(map, marker.getPosition());
      };
  
      naver.maps.Event.addListener(marker, 'mouseover', showInfoWindow);
      naver.maps.Event.addListener(marker, 'mouseout', () => infoWindow.close());
      naver.maps.Event.addListener(marker, 'click', showInfoWindow);
    });
  }, [currentPosition, storeData, map])

  return (
    <>
    <Title>판매점 찾기</Title>
    <MapContainer id="map">
        <CurrentLocationButton id="currentLocationButton" onClick={getCurrentLocation}>
          <LocationIcon width="24px" height="24px"/>
        </CurrentLocationButton>
      </MapContainer>
    </>
  )
}

export default Map
