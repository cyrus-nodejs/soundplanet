import { getSongs, fetchAllTracks } from "../../redux/features/audio/audioSlice"
import { getAuthUser,  fetchAsyncUser } from "../../redux/features/auth/authSlice"
import { useAppSelector, useAppDispatch } from "../../redux/app/hook"
import { useEffect } from "react"
// import { playTrack } from "../../redux/features/audio/audioSlice"
import { Spinner, Button, Image,   Row, } from "react-bootstrap"

import { TRACK } from "../../utils/@types"

import { fetchDeleteSong } from "../../redux/features/admin/adminSlice"
const AllProducts = () => {
const dispatch = useAppDispatch()
const allsongs = useAppSelector(getSongs)

const authUser = useAppSelector(getAuthUser)
 
useEffect(() =>{
    dispatch(fetchAsyncUser())
    
    
      }, [dispatch])
  
      useEffect(() =>{
        dispatch(fetchAllTracks())
        
 
          }, [dispatch])
      
  
  return (
    <section>
      {authUser?.role === 'admin' && (
  <Row  className='' >
  {allsongs && allsongs.length > 0  ? (<div>
    <div>
<div className="d-inline-flex p-2 fs-4 border-info  border-bottom">All Songs</div>
</div>
  <div  className="row">

{allsongs?.map((track:TRACK) =>{
return (

  <div  className="position-relative  col"  >
   
   <Image src={track.image.url} width="180" height="150"   rounded />
   {/* <i onClick={() => dispatch(playTrack(track))} className='bx bx-play-circle top-left position-absolute bottom-0 end-0  text-light bx-lg' ></i> */}
    <div className="figure-caption text-light  ">{track.title}</div> 
 
     

    {authUser?.role === 'admin' &&  (    <div className="text-center d-grid gap-2"><Button variant="" size="sm" onClick={() => dispatch(fetchDeleteSong(track))}   className="d-block btn btn-outline-success" >Delete Item</Button></div> )}  
 </div>

 
   )
})}

</div>

  </div>):(<div className="fs-4 text-center"><Spinner animation="border" variant="primary" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner> <p className="fs-4 text-center">Refresh Page</p> </div>)}
 
 
 

</Row>
      )}
   
  
</section>
  )
}

export default AllProducts