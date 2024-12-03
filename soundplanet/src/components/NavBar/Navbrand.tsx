
import { Link } from "react-router-dom"
const Navbrand = () => {
  return (
    <div>
    <div className='fs-3 fw-light text-success d-none d-lg-block'><Link to="/" className="text-decoration-none  text-success" >SoundPlanet</Link></div>
    <div className='fs-5 d-lg-none fw-light  text-success '><Link to="/" className="text-decoration-none  text-success" >SoundPlanet</Link></div>
    </div>
  )
}

export default Navbrand