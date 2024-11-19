/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {  Container   } from "react-bootstrap"
import NavIndex from "../../../../components/NavBar/NavIndex";

import HomeLeft from "../../HomeLeft";
import HomeRight from "../../HomeRight";
import Audioplayer from "../../../../components/Player/Audioplayer";
import { TRACK, PLAYLIST } from "../../../../utils/@types";
import { Row, Image,  Overlay, Tooltip  } from "react-bootstrap"
import * as ContextMenu from "@radix-ui/react-context-menu";


import {getRecentlyPlayed, fetchAddToPlaylist,  getPlaylist } from "../../../../redux/features/playlist/playlistSlice";
import { getCurrentSub } from "../../../../redux/features/checkout/checkoutSlice";
import { getUpdateUser } from "../../../../redux/features/auth/authSlice";

import { useAppDispatch, useAppSelector } from "../../../../redux/app/hook";
import { playTrack, getSearchTerm } from "../../../../redux/features/audio/audioSlice";
import { useState,  useRef } from "react"
 import { Link } from "react-router-dom";
import NavSearchResults from "../../../../components/NavBar/NavSearch/NavSearchResults";


const AllRecentlyPlayed = () => {
  
  const RecentlyPlayed = useAppSelector(getRecentlyPlayed)
  const user = useAppSelector(getUpdateUser)
  const searchterm = useAppSelector(getSearchTerm)
  


  const [Show, setShow] = useState(false);
  const target = useRef(null);
  
    
  const dispatch = useAppDispatch()
  const currentSub = useAppSelector(getCurrentSub)
  const Playlist = useAppSelector(getPlaylist)
  
  
  console.log(Playlist)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let data;

 
  
 


  const HandleSelect = (e:Event) =>{
    e.preventDefault()
    }
     
 
    
    console.log(RecentlyPlayed)
  return (
    
    <Container fluid>
    <NavIndex />
        <div className="row mt-5">
            <HomeLeft />
            <Row  className='mx-1 my-2  homeCenter  col-7' >
            
            { user && RecentlyPlayed ? (
          <div>
     {!searchterm ? (<div><div className="d-flex mb-3">

<div className="d-inline-flex my-3 fs-4 border-info  border-bottom">Recently Played</div>

</div>

 <div className="row   ">
{RecentlyPlayed.slice(0, 4).map((track:TRACK) =>{
return (
 <div  className=" col   ">
 <ContextMenu.Root>
<ContextMenu.Trigger className="ContextMenuTrigger">

<div className="position-relative mb-4 " style={{width:"180px", height:"150px"}} >
     
     <Image src={track.image.url} width="180" height="150"   rounded />
     <i onClick={() => dispatch(playTrack(track))} className='bx bx-play-circle top-left position-absolute bottom-0 end-0  text-light bx-lg' ></i>
      <div className="figure-caption text-light  ">{track.title}</div> 
   </div>
</ContextMenu.Trigger>
<ContextMenu.Portal>
<ContextMenu.Content
className="ContextMenuContent bg-dark"

>
<ContextMenu.Item className="ContextMenuItem">
<Link to={`/allartists`} className='text-decoration-none d-block text-success '> Go to Artist Radio  </Link> 
</ContextMenu.Item>
<ContextMenu.Item className="ContextMenuItem">
 Reload <div className="RightSlot">⌘+R</div>
</ContextMenu.Item>
<ContextMenu.Sub>
 <ContextMenu.SubTrigger className="ContextMenuSubTrigger">
   Add to Playlist
   <div className="RightSlot">
   <i className='bx bx-chevron-right'></i>
   </div>
 </ContextMenu.SubTrigger>
 <ContextMenu.Portal>
   <ContextMenu.SubContent
     className="ContextMenuSubContent"
     sideOffset={2}
     alignOffset={-5}
   >

     {Playlist ? (<div>
{Playlist?.map((list:PLAYLIST, id:number) =>{
return (
 
 <ContextMenu.Item onSelect={HandleSelect} className="ContextMenuItem bg-dark" key={id} id="reload" onClick={() => dispatch(fetchAddToPlaylist(data= {track, list}))}> {list?.title} 
 </ContextMenu.Item>

    )
})}

</div>
) : (
null
) }  
     
     
   </ContextMenu.SubContent>
 </ContextMenu.Portal>
</ContextMenu.Sub>
<ContextMenu.Separator className="ContextMenuSeparator" />
<ContextMenu.Sub>
 <ContextMenu.SubTrigger className="ContextMenuSubTrigger">
Download
   <div className="RightSlot">
   <i className='bx bx-chevron-right'></i>
   </div>
 </ContextMenu.SubTrigger>
 <ContextMenu.Portal>
   <ContextMenu.SubContent
     className="ContextMenuSubContent"
     sideOffset={2}
     alignOffset={-5}
   >
   
     {currentSub?.active == "Pro" || currentSub?.active == "Premium" ? (	<ContextMenu.Item onSelect={HandleSelect} className="ContextMenuItem "><a href={ `${track.songfile.url}` } className="text-decoration-none text-light"  target="_blank" download>   <div className="d-flex ">   <div className="me-1">Download</div>
<div className=""><i className='bx bx-download text-light'></i></div> </div></a></ContextMenu.Item>) : (   <ContextMenu.Item onSelect={HandleSelect} className="ContextMenuItem ">
<div className="border border-none"    ref={target} onClick={() => setShow(!Show)}>
Subscribe to Download    </div>
<Overlay target={target.current} show={Show} placement="top">
{(props) => (
<Tooltip id="overlay-example" {...props}>
  Pls Subscribe to Download
</Tooltip>
)}
</Overlay>
</ContextMenu.Item>) }
     
     
   </ContextMenu.SubContent>
 </ContextMenu.Portal>
</ContextMenu.Sub>
<ContextMenu.Item className="ContextMenuItem">
<Link to={`/report`} className='text-decoration-none d-block text-light '> Report </Link> 
</ContextMenu.Item>
</ContextMenu.Content>
</ContextMenu.Portal>
</ContextMenu.Root>
</div>


   )
})}



</div></div>) :  (<NavSearchResults />)}
           
      
      
        </div>
         ): (null)}
    
</Row>
            <HomeRight />
    </div>
    <Audioplayer />
      </Container>
           
      
  )
}

export default AllRecentlyPlayed;