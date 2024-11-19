/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Image, Row,Tooltip, Overlay,  Table, Container } from 'react-bootstrap';
import { PLAYLIST, TRACK } from '../../../../utils/@types';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavSearchResults from '../../../../components/NavBar/NavSearch/NavSearchResults';
import Audioplayer from '../../../../components/Player/Audioplayer';
import HomeLeft from '../../HomeLeft';
import HomeRight from '../../HomeRight';
import NavIndex from '../../../../components/NavBar/NavIndex';
import { useAppDispatch, useAppSelector } from '../../../../redux/app/hook';
import { getArtists, getSongs, getSearchTerm } from '../../../../redux/features/audio/audioSlice';
import { playAllTracks } from '../../../../redux/features/audio/audioSlice';
import { Link } from 'react-router-dom';
import { fetchAddToPlaylist, getPlaylist } from '../../../../redux/features/playlist/playlistSlice';
import { getCurrentSub } from '../../../../redux/features/checkout/checkoutSlice';
import * as ContextMenu from "@radix-ui/react-context-menu";
const Artistdetails = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let data 
     const {id} = useParams()
     const [Show, setShow] = useState(false);
     const target = useRef(null);
  const dispatch = useAppDispatch()
     const artists = useAppSelector(getArtists)
     const songs = useAppSelector(getSongs)
     const Playlist = useAppSelector(getPlaylist)
     const currentSub = useAppSelector(getCurrentSub)
     const searchterm = useAppSelector(getSearchTerm)
     const HandleSelect = (e:Event) =>{
      e.preventDefault()
      }
      
  const filterTrack = (current: string | undefined) => {
    return  songs.filter(song =>  song.artistname === current );
  };
  const artistTrack = filterTrack(id)
  console.log(artistTrack)

  const filterArtist = (current: string | undefined) => {
    return  artists.filter(song =>  song.artistname === current );
  };
  const currentArtist = filterArtist(id)
  console.log(currentArtist)
 

  return (
    <Container fluid>
    <NavIndex />
        <div className="row  mt-5">
            <HomeLeft />
            <Row  className='mt-3 py-3 artistbg mx-1 my-2 homeCenter  col-7' >
        {searchterm ? (<NavSearchResults />) : (  <div>
           
           <div className="artistbg" >
        <div className="d-flex align-items-center">
  <div className="flex-shrink-0">
    <Image src={currentArtist[0]?.avatarbg.url} height="180" width="180" rounded/>
  </div>
  <div className="flex-grow-1 ms-3">
  <div className="d-flex flex-column mb-3">
  <div className="p-2 text-start">Playlist</div>
  <div className="p-2 fs-3 fw-bold">Artist Mix</div>
  <div className="p-2">{currentArtist[0]?.artistname}</div>
  <div className="p-2">SoundPlanet {artistTrack.length} songs </div>
</div>
</div>
</div>
    </div>
    <div className="d-flex mb-3">
  <div className="p-2"><i onClick={() => dispatch(playAllTracks(artistTrack))} className='bx bx-play text-success border border-success  bx-border-circle bx-lg' ></i></div>
  <div className="p-2"><i className='bx bx-plus mt-3 border text-success border-success bx-border-circle bx-sm'></i></div>
  <div className="ms-auto p-2"><i className='bx bx-menu mt-3 border text-success border-success'></i></div>
</div>
<ContextMenu.Root>
<ContextMenu.Trigger className="ContextMenuTrigger">
  <div className="pb-5">
    <Table  className="  table-dark table-hover  table-dark  table-active  table-hover mt-1" responsive   >
      <thead>
        <tr>
        <th>#</th>
          <th>Title</th>
          <th>Album</th>
          <th>Year</th>
          <th><i color='white' className='bx  bx-alarm  text-light bx-sm'></i></th>
        </tr>
      </thead>
 
      <tbody className="">
      {artistTrack?.map((track:TRACK, id) =>{
        return (
      
        <tr>
          <td>
           {id}
  
          </td>
          <td>
          <div className="d-flex align-items-center  ">
  <div className="flex-shrink-0">
    <Image src={track?.image?.url} alt="..." width="50" height="50" />
  </div>
  <div className="flex-grow-1 ms-3 ">
  {track?.title}
  </div>
</div>
         
          </td>
          <td>{track?.album}</td>
          <td>
          {track?.year}
          
          </td>
          <td>
          {track?.duration}
          
          </td>
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
        </tr>
        
       
      )
    })}
  
      </tbody>
      
    </Table>
    </div>
    </ContextMenu.Trigger>
		</ContextMenu.Root>   
      
      
        </div>)}
        
         
       
</Row>
            <HomeRight />
    </div>
    <Audioplayer />
      </Container>
    
   
  )
}

export default Artistdetails