import { useEffect, useState } from 'react'
import { MapContainer } from './style'

declare global {
  interface Window {
    naver: any
  }
}

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState<{ latitude: number; longitude: number } | null>(null)

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
          setCurrentPosition({ latitude: 37.5665, longitude: 126.9780 }) // 기본 서울 좌표 설정
        }
      )
    } else {
      setCurrentPosition({ latitude: 37.5665, longitude: 126.9780 })
    }
  }, [])

  // 지도 생성
  useEffect(() => {
    if (currentPosition) {
      const { naver } = window

      if (!naver) return console.log('Naver maps not loaded')

      const mapOptions = {
        center: new naver.maps.LatLng(currentPosition.latitude, currentPosition.longitude),
        zoom: 18,
      }

      const map = new naver.maps.Map('map', mapOptions)
    }
  }, [currentPosition])

  return (
    <MapContainer id="map" />
  )
}

export default Map
