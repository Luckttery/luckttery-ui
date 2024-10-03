import { SkeletonBox, SkeletonContainer } from "./style";

type skeletonSize = {
  width?: string;
  height?: string;
}

const Skeleton = ({width, height}: skeletonSize) => (
  <SkeletonContainer>
    <SkeletonBox style={{ width: width, height: height }}/>
  </SkeletonContainer>
);

export default Skeleton
