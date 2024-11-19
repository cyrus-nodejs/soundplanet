
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {  TRACK } from "../../utils/@types";
import "../../index.css"
import * as ContextMenu from "@radix-ui/react-context-menu";
import { Link } from "react-router-dom";
import {  useEffect } from "react";
import { Image, Row,  Table, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import HomeLeft from "../Home/HomeLeft";
import HomeRight from "../Home/HomeRight";
import NavIndex from "../../components/NavBar/NavIndex";
import Audioplayer from "../../components/Player/Audioplayer";

import Login from "../Auth/Login";

import { useAppDispatch, useAppSelector } from "../../redux/app/hook";
import { playAllTracks, fetchCurrentPlaylist, getPlayList, getPlayListSong } from "../../redux/features/audio/audioSlice";
import { getIsAuthenticated, getUpdateUser } from "../../redux/features/auth/authSlice";
import { fetchClearPlaylist, fetchDeleteFromPlayist } from "../../redux/features/playlist/playlistSlice";

const Playlist = () => {

     // eslint-disable-next-line @typescript-eslint/no-unused-vars
let data;
  
    
    const { id } = useParams()
    const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const user = useAppSelector(getUpdateUser)
  const playList = useAppSelector(getPlayList)
const playListSong = useAppSelector(getPlayListSong)
    


   
    useEffect(() =>{
        dispatch(fetchCurrentPlaylist(id))
          }, [dispatch, id])
          



 
    
     

   
          console.log(playListSong)
          console.log(playList)
  return (
    <section className="artistbg">
    {isAuthenticated  && user ? (  <Container fluid>
        <NavIndex />
            <div className="row   mt-5">
                <HomeLeft />
                <Row  className='mt-3 pb-3  mx-1 my-2 homeCenter  col-7' >
             {playList && (
           
              <div className="">
               
               <div className="" >
            <div className="d-flex align-items-center">
      <div className=" flex-shrink-0">
        {/* <Image src={Playlist[0]?.avatarbg.url} height="180" width="180" rounded/> */}
      </div>
      <div className="flex-grow-1 ms-3">
      <div className="d-flex flex-column mb-3">
      <div className="p-2 text-start">Playlist</div>
      <div className="p-2 fs-3 fw-bold"></div>
      <div className="p-2">{playList?.title} </div>
      <div className="p-2">SoundPlanet {playListSong?.length} songs </div>
    </div>
    </div>
    </div>
    <div className="d-flex mb-3 ">
      <div className="p-2"><i onClick={() => dispatch(playAllTracks(playListSong))} className='bx bx-play text-success border border-success  bx-border-circle bx-lg' ></i></div>
      <div className="p-2"><i className='bx bx-plus mt-3 border text-success border-success bx-border-circle bx-sm'></i></div>
      <div className="ms-auto p-2"><i className='bx bx-menu mt-3 border text-success border-success'></i></div>
    </div>
        </div>
     
       
        <ContextMenu.Root>
        <ContextMenu.Trigger className="ContextMenuTrigger">
          <Table   className="table  table-success table-border   table-active  table-hover mt-1" responsive   >
          <thead>
            <tr>
            <th className="text-success">#</th>
              <th  className="text-success">Title</th>
              <th  className="text-success">Album</th>
              <th  className="text-success"> Date</th>
              <th  className=""><div className=""><i className='bx text-success  bx-sm bx-alarm'></i></div></th>
            </tr>
          </thead>
          <tbody >
                    
          {playListSong?.map((track:TRACK, id) =>{
            return (

      
              <tr>
               
               <td className="text-success">
                {id}
       
               </td>
               <td>
               <div className="d-flex align-items-center ">
       <div className="flex-shrink-0 ">
         <Image src={track?.image?.url} alt="..." width="50" height="50" />
       </div>
       <div className="flex-grow-1 ms-3 text-success  ">
       {track?.title}
       </div>
     </div>
              
               </td>
               <td className=" text-success ">{track?.album}</td>
               <td className=" text-success" >
               {track?.year}
               
               </td>
               <td className="text-success" >
               {track?.duration}
               
               </td>
               <ContextMenu.Portal>
                <ContextMenu.Content
                  className="ContextMenuContent bg-dark"
                
                  
                >
                  <ContextMenu.Item className="ContextMenuItem">
          <Link to={`/allartists`} className='text-decoration-none d-block text-success '> Go to Artist Radio  </Link> 
					</ContextMenu.Item>
                  <ContextMenu.Item  onClick={() => dispatch(fetchClearPlaylist(playList))} className="ContextMenuItem">
                  Clear Playlist
                  </ContextMenu.Item>
                
      
                  <ContextMenu.Item  className="ContextMenuItem bg-dark"  id="something" onClick={() => dispatch(fetchDeleteFromPlayist(data= {track, playList}))} >Remove from  {playList.title} Playlist</ContextMenu.Item>
                  <ContextMenu.Item className="ContextMenuItem">
          <Link to={`/report`} className='text-decoration-none d-block text-success '> Report </Link> 
					</ContextMenu.Item>
                </ContextMenu.Content>
              </ContextMenu.Portal>
             </tr>
                 
      )
    })}
             </tbody>
          
          </Table>
              </ContextMenu.Trigger>
              
            </ContextMenu.Root>
      
         
              
          
          
            </div>
           
             )}
           
    </Row>
                <HomeRight />
        </div>
        <Audioplayer />
          </Container>) : (<Login />)}
          </section>
  
  )
}

export default Playlist