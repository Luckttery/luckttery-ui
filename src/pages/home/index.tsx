import { StyledContainer} from "./style";
import Header from "../../components/Header";
import Recommend from "../../components/recommend";
import Latest from "../../components/latest";

const Home = () => {
  return (
    <StyledContainer>
      <Header/>
      <Recommend/>
      <Latest/>
    </StyledContainer>
  );
};

export default Home;
