/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { TRACK, PLAYLIST } from "../../../../utils/@types";
import { Row, Image,  Overlay, Tooltip  } from "react-bootstrap"
import { useState, useEffect, useRef } from "react";
import {  fetchAddToPlaylist,  getPlaylist} from "../../../../redux/features/playlist/playlistSlice";
import { getCurrentSub } from "../../../../redux/features/checkout/checkoutSlice";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { Link } from "react-router-dom";



import { useAppDispatch, useAppSelector } from "../../../../redux/app/hook";
import { playTrack } from "../../../../redux/features/audio/audioSlice";
import { fetchTopTen , getTopTen} from "../../../../redux/features/audio/audioSlice";
const Topten = () => {
  

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let data;
  

  const Playlist = useAppSelector(getPlaylist)
const [Show, setShow] = useState(false);
const target = useRef(null);
const dispatch = useAppDispatch()
const currentSub = useAppSelector(getCurrentSub)
const Topten = useAppSelector(getTopTen)


  
 
  
const HandleSelect = (e:Event) =>{
  e.preventDefault()
  }
   

      
       console.log(Topten)
    
     
   
useEffect(() =>{
  dispatch(fetchTopTen())
    }, [dispatch])
    console.log(Topten)


    console.log(Topten)


    
  
  return (
    
           
           
      <Row  className='vh-100' >
         {Topten ? (
          <div>
     
           <div className="d-flex ">

           <div className="d-inline-flex my-3 fs-4 border-info  border-bottom">Top Ten</div>
    <div className="ms-auto p-2 d-none d-lg-block"><Link to="/topten" className="text-decoration-none text-light">Show all</Link>  </div>
  </div>
        
            <div className="row   ">
       {Topten.slice(0, 4).map((track:TRACK) =>{
          return (
        <figure  className="figure col position-relative  ">
          <ContextMenu.Root>
			<ContextMenu.Trigger className="ContextMenuTrigger">
      <div className="container ">
                <Image src={track.image.url} className=" rounded-3" width="148" height="120"  />
                </div>
                <div className="">
                <i onClick={() => dispatch(playTrack(track))} className='bx bx-play-circle top-left   text-light bx-lg' ></i>
                {/* {currentplaying ? <i onClick={() => PlayTrack(track)} className='bx bx-play-circle top-left   text-light bx-lg' ></i>:<i className='bx bx-play-circle control-icon top-left  bx-lg' ></i> } */}
                
  </div> 
                 <figcaption className="figure-caption text-light  ">{track.title}</figcaption> 
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
''
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

                </figure>
              )
       })}



       </div>
      
      
        </div>
         ): (<div>No items found</div>)}
       
</Row>
  )
}

export default Topten;