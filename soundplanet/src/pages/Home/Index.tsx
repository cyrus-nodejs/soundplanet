import { Container} from "react-bootstrap"
import NavIndex from "../../components/NavBar/NavIndex"
import Center from "./Center"
import HomeLeft from "./HomeLeft"
import HomeRight from "./HomeRight"
import Audioplayer from "../../components/Player/Audioplayer"
 import NavBottom from "../../components/NavBar/NavBottom"
const Index = () => {
  
  return (
  <Container fluid className="">
<NavIndex />
    <div className="row mt-5 ">
        <HomeLeft />
      <Center />  
        <HomeRight />
        
</div>
<Audioplayer />
<NavBottom />
  </Container>
  )
}

export default Index