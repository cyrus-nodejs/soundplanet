/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Row, Col } from 'react-bootstrap'
import { AudioPlayerContext } from '../../context/audioPlayer'
import { useContext } from 'react'
import {useAppSelector} from "../../redux/app/hook"
import { getCurrentTrack } from '../../redux/features/audio/audioSlice'
import { handleNext } from '../../redux/features/audio/audioSlice'
import { useAppDispatch } from '../../redux/app/hook'
import { fetchAddRecentlyPlayed } from '../../redux/features/playlist/playlistSlice'
const DisplayTrack = () => {
  const dispatch = useAppDispatch()
  const currentTrack = useAppSelector(getCurrentTrack)
    
  const { audioRef, progressBarRef,   setDuration } = useContext(AudioPlayerContext)

  
      
   const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds)
    progressBarRef.current.max = seconds
}
 
  return (
    <Row className="">
       <Col>
       <audio 
       src={currentTrack?.songfile?.url }
       ref={audioRef}
       onLoadedMetadata={onLoadedMetadata}
       onEnded={() =>{ dispatch(handleNext()); dispatch(fetchAddRecentlyPlayed(currentTrack)) }}
       >
       </audio>
       
        <div  className="d-flex  align-items-center ">
  <div className="d-none d-lg-block flex-shrink-0">{currentTrack?.image ? (
            <img className="rounded-circle mt-1" src={currentTrack?.image?.url} height="50" width="50" alt="audio avatar" />
          ) : (
            <div className="icon-wrapper">
              <span className="audio-icon">
              <i className='bx bxs-music' ></i>
              </span>
            </div>
          )}</div>
  <div className="flex-grow-1 d-lg-block ms-3"><div className="text-light  fs-6 fw-normal">{currentTrack?.title}</div><div className="text-light fs-6 ">{currentTrack?.artistname}</div></div>
  
</div>
       </Col> 
    </Row>
  )
}

export default DisplayTrack