import Control from "./Control/Control"
import ProgressBarDiv from "./ProgressBar"
import DisplayTrack from "./DisplayTrack"
import Volume from "./Volume"
import "./Player.css"


const Audioplayer = () => {

    
 
    return (
 
   
  
   <div className="d-flex audioplayer fixed-bottom ">
  <div className="col-2 "><DisplayTrack  /></div>
  <div className=" col-8"><div className="text-start fs-6 fw-normal"><Control  /></div><div className="text-start fs-6 "><ProgressBarDiv  /></div></div>
  <div className="col-2 "><Volume  /></div>
</div>
 
  )
}

export default Audioplayer