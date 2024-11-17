import { useEffect, useState } from 'react'
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
    const script = document.createElement('script')
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}`
    script.async = true
    document.head.appendChild(script)

    script.onload = () => {
      console.log('Naver Maps script loaded')
    }

    return () => {
      document.head.removeChild(script) // 컴포넌트가 언마운트되면 스크립트 제거
    }
  }, [])

  // 현재 위치 가져오기
  useEffect(() => {
    getCurrentLocation()
  }, [])

  // 상점 정보 가져오기
  useEffect(() => {
    if (currentPosition) {
      const fetchStores = async () => {
        try {
          const response = await fetchStoreList(currentPosition.latitude, currentPosition.longitude, 2)
          setStoreData(response)
        } catch (error) {
          console.error('Error fetching locations:', error)
        }
      }

      fetchStores()
    }
  }, [currentPosition])

  // 지도 생성 및 마커 추가
  useEffect(() => {
    if (currentPosition && storeData.length > 0) {
      const { naver } = window
  
      if (!naver) return console.log('Naver maps not loaded')
  
      const mapOptions = {
        center: new naver.maps.LatLng(currentPosition.latitude, currentPosition.longitude),
        zoom: 18,
      }
  
      const map = new naver.maps.Map('map', mapOptions);

      setMap(map)
  
      new naver.maps.Marker({
        position: new naver.maps.LatLng(currentPosition.latitude, currentPosition.longitude),
        map: map,
        icon: {
          content: '<div style="width: 16px; height: 16px; background: red; border-radius: 50%; border: 2px solid white;"></div>',
          anchor: new naver.maps.Point(12, 12),
        },
      })
  
      const infoWindow = new naver.maps.InfoWindow({
        anchorSkew: true,
        maxWidth: 230,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderColor: 'transparent',
      })
  
      storeData.forEach((store) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(store.location.coordinates[1], store.location.coordinates[0]),
          map: map,
        })
  
        const showInfoWindow = () => {
          const icons = [];
  
          if (store.selling_items.sells_annuity) {
            icons.push(Lotto645Icon)
          }
          if (store.selling_items.sells_lotto) {
            icons.push(Lotto520Icon)
          }
          if (store.selling_items.sells_speeto_500 || store.selling_items.sells_speeto_1000 || store.selling_items.sells_speeto_2000) {
            icons.push(SpeetoIcon)
          }
  
          const iconElements = icons.map(icon => `<img src="${icon}" alt="Lottery Icon" style="width: 58px; height: 14px; margin-right: 5px;"/>`).join('');
  
          infoWindow.setContent(`
            <div style="padding: 10px; font-family: sans-serif; border: 1px solid #ccc; border-radius: 10px; background-color: white;">
              <div style="font-size: 16px; font-weight: bold; margin-bottom: 5px;">${store.name}</div>
              <div style="font-size: 14px; margin-bottom: 5px;">${decodeHTMLEntities(store.address.full_address)}</div>
              <div style="display: flex; align-items: center;">${iconElements}</div>
            </div>
          `)
  
          infoWindow.open(map, marker.getPosition());
        }
  
        naver.maps.Event.addListener(marker, 'mouseover', showInfoWindow)
        naver.maps.Event.addListener(marker, 'mouseout', () => infoWindow.close())
  
        // 모바일 환경에서는 click 이벤트 사용
        naver.maps.Event.addListener(marker, 'click', showInfoWindow)
      })
    }
  }, [currentPosition, storeData])

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setCurrentPosition({ latitude, longitude })
        },
        (error) => {
          console.error('Error fetching location: ', error)
          setCurrentPosition(SEOUL_COORDINATES)
        }
      )
    } else {
      setCurrentPosition(SEOUL_COORDINATES)
    }

    if (currentPosition) {
      if (!map) return console.log('Naver maps not loaded')

      map.setOptions('center', new naver.maps.LatLng(currentPosition.latitude, currentPosition.longitude))
    }
  }

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
