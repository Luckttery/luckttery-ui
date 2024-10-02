// Skeleton.js
import styled from "styled-components";

interface SkeletonBoxProps {
  width?: string;
  height?: string;
}

export const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  width: 100%;
  padding: 10px;
  align-items: center;
`;

export const SkeletonBox = styled.div<SkeletonBoxProps>`
  background-color: #e0e0e0;
  height: ${(props) => props.height || "100%"};
  width: ${(props) => props.width || "100%"};
  border-radius: 4px;
  animation: shimmer 1.5s infinite linear;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;

  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: 200px 0;
    }
  }
`;
