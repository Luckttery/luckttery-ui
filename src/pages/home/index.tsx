import { StyledContainer} from "./style";
import Recommend from "../../components/recommend";
import Latest from "../../components/latest";
import Map from "../../components/NaverMap"

const Home = () => {
  return (
    <StyledContainer>
      <Recommend/>
      <Latest/>
      <Map/>
    </StyledContainer>
  );
};

export default Home;
