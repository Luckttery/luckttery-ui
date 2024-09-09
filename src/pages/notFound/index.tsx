import { NotFoundContainer, NotFoundLink, NotFoundTitle } from './style';

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundTitle>앗! 이 페이지는 존재하지 않는 페이지예요.</NotFoundTitle>
       <NotFoundLink to="/">홈으로 돌아가기</NotFoundLink>
    </NotFoundContainer>
  );
}

export default NotFound;
