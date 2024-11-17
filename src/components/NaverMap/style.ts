import styled from "styled-components"

export const MapContainer = styled.div`
  height: 400px;
  padding-top: 20px;
`;

export const Title = styled.h2`
  text-align: center;
  padding-top: 20px;
`;

export const CurrentLocationButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  width: 50px;
  height: 50px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #8c8c8c;
  }
`;
