
import Newtrack from "./HomeCenter/NewTrack/NewTrack"
import Artists from "./HomeCenter/Artists/Artists";
import Genres from "./HomeCenter/Genres/Genres";
import Topten from "./HomeCenter/TopTen/Topten";
import NavSearchResults from "../../components/NavBar/NavSearch/NavSearchResults";
 import RecentlyPlayed from "./HomeCenter/RecentlyPlayed/RecentlyPlayed";
 import {  getSearchTerm } from "../../redux/features/audio/audioSlice"
 import { useAppSelector } from "../../redux/app/hook";
 import { getUpdateUser, getIsAuthenticated } from "../../redux/features/auth/authSlice";
const Center = () => {
const user = useAppSelector(getUpdateUser)
const isAuthenticated = useAppSelector(getIsAuthenticated)

const searchTerm = useAppSelector(getSearchTerm)

  return (
    <div  className="col-7 mt-3 pb-5 homeCenter    text-light ">
      {!searchTerm ? (<div>
        <Artists />
<Genres />
{user && isAuthenticated &&   <RecentlyPlayed/> }
 <Newtrack /> 
<Topten />
    </div>
      ) : 
      (<div>
        <NavSearchResults />
      </div>) } 

  </div>
  )
}

export default Center;