import { StyledContainer} from "./style";
import Recommend from "../../components/recommend";
import Latest from "../../components/latest";

const Home = () => {
  return (
    <StyledContainer>
      <Recommend/>
      <Latest/>
    </StyledContainer>
  );
};

export default Home;
