import { GENRE } from "../../../../utils/@types";
import { Row, Image, Container  } from "react-bootstrap"


import { Link } from "react-router-dom";

import NavSearchResults from "../../../../components/NavBar/NavSearch/NavSearchResults";
import NavIndex from "../../../../components/NavBar/NavIndex";
import HomeLeft from "../../HomeLeft";
import HomeRight from "../../HomeRight";
import Audioplayer from "../../../../components/Player/Audioplayer";
import { useAppSelector } from "../../../../redux/app/hook";
import { getGenres, getSearchTerm } from "../../../../redux/features/audio/audioSlice";
const AllGenres = () => {
  const genres =  useAppSelector(getGenres)
  const searchterm = useAppSelector(getSearchTerm)
    console.log(genres)
  return (
    
    <Container className="" fluid>
    <NavIndex />
        <div className="row mt-5">
            <HomeLeft />
            <Row  className='m-1 mt-3 homeCenter   col' >
        {searchterm ? (<NavSearchResults />) : (<div>
           <div className="d-inline-flex my-3 text-light fs-4 border-info position-sticky border-bottom">GENRES</div>
        
            <div className="col   ">
       {genres.map((track:GENRE) =>{
          return (
        <figure className="figure col ">
            <Link to={`/genre/${track.title}`} className="text-decoration-none text-light">    <Image src={track.genrebg.url} className="m-3 rounded-3" width="130" height="120"  rounded/></Link>
                 <figcaption className="figure-caption text-light  ">{track.title}</figcaption> 
                </figure>
              )
       })}
    
       </div>
      
      
        </div>)}
          
    
       
</Row>
            <HomeRight />
    </div>
    <Audioplayer />
      </Container>   
           
     
  )
}

export default AllGenres;