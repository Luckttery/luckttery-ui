import { StyledContainer } from "./style"

const Intro: React.FC = () => {
  return (
    <StyledContainer>
      <div style={{ textAlign: 'center', margin: '50px auto' }}>
      <h1 style={{ fontSize: '2em', color: '#333' }}>로또 번호를 특별하게 생성해보세요.</h1>
      <p style={{ fontSize: '1.2em', color: '#666', margin: '20px 0' }}>
        번호 생성, 당첨 확인, 매장 찾기까지 한 번에!
      </p>
    </div>
    </StyledContainer>
  )
}

export default Intro