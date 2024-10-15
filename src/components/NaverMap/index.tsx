import { useEffect, useState } from 'react'
import { fetchStoreList } from '../../api/lucktteryApi/api'
import { StoreInfo } from '../../api/lucktteryApi/types'
import { MapContainer } from './style'

const SEOUL_COORDINATES = { latitude: 37.5665, longitude: 126.9780 } // 기본 서울 좌표

declare global {
  interface Window {
    naver: any
  }
}

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState<{ latitude: number; longitude: number } | null>(null)
  const [storeData, setStoreData] = useState<StoreInfo[]>([])

  // 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setCurrentPosition({ latitude, longitude })
        },
        (error) => {
          console.error("Error: ", error)
          setCurrentPosition(SEOUL_COORDINATES)
        }
      )
    } else {
      setCurrentPosition(SEOUL_COORDINATES)
    }
  }, [])

  // 상점 정보 가져오기
  useEffect(() => {
    if (currentPosition) {
      const fetchStores = async () => {
        try {
          const response = await fetchStoreList(currentPosition.latitude, currentPosition.longitude, 10) // 반경은 임시
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

      const map = new naver.maps.Map('map', mapOptions)

      new naver.maps.Marker({
        position: new naver.maps.LatLng(currentPosition.latitude, currentPosition.longitude),
        map: map,
        icon: {
          content: '<div style="width: 16px; height: 16px; background: red; border-radius: 50%; border: 2px solid white;"></div>',
          anchor: new naver.maps.Point(12, 12),
        }
      })

      storeData.forEach((store) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(store.location.coordinates[1], store.location.coordinates[0]),
          map: map,
        })
      })
    }
  }, [currentPosition, storeData])

  return (
    <MapContainer id="map" />
  )
}

export default Map
