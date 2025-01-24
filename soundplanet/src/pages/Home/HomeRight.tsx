import { Image, Row } from "react-bootstrap";

import { useAppSelector } from "../../redux/app/hook";
import { getArtists, getCurrentTrack } from "../../redux/features/audio/audioSlice";


const HomeRight = () => {

 const artists = useAppSelector(getArtists)
const currentTrack = useAppSelector(getCurrentTrack)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterCurrentTrack = (current:any) => {
    return  artists.filter(song =>  song.artistname === current );
  };
  const Trackqueue = filterCurrentTrack(currentTrack?.artistname)
  console.log(Trackqueue)
    

  // const menuItems = [...new Set(Tracks.filter((Val) => Val.artist === artist))];
  return (

    <div className="col-2 pb-5 d-none d-lg-block mt-3 vh-100 rounded ms-1 homeRight p-3  text-light ">
        <Row className='pb-5'>
        <div className="d-flex mb-3">
    <div className="p-2">Chill Mixs</div>
    
    <div className="ms-auto p-2">  <i className='bx me-1 bx-dots-horizontal-rounded' ></i> <i className='bx bx-x'></i></div>
  </div>

  <div className="d-flex ">
  <figure className="figure col ">
                <Image src={currentTrack?.image?.url} className=" rounded-3" fluid  rounded/>
                <figcaption className="figure-caption fw-bold f5-4 text-light  ">{currentTrack?.title}</figcaption> 
                 <figcaption className="figure-caption text-light  ">{currentTrack?.artistname}, {currentTrack?.album}</figcaption> 
                </figure>
  
</div>
    
<div className="p-2">Next: From Chill Mix</div>

<div className=" ">
  <figure className="figure col "> 
                 <Image src={Trackqueue[0]?.avatarbg.url} className=" rounded-3" fluid  rounded/>
                <figcaption className="figure-caption fw-bold f5-4 text-light  ">{Trackqueue[0]?.artistname}</figcaption> 
                 <div className="figure-caption text-light    ">{Trackqueue[0]?.biography.substring(0, 500) + "...."}</div> 
                </figure>
  
</div>

       </Row>
    </div>
  
  
)
}

export default HomeRight;