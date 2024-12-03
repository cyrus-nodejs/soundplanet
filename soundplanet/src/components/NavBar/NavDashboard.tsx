

import { useAppDispatch, useAppSelector } from "../../redux/app/hook";
import { fetchAsyncLogout ,  getUpdateUser} from "../../redux/features/auth/authSlice";
import { getIsAuthenticated } from "../../redux/features/auth/authSlice";
const NavDashboard = () => {
    
 const updateUser = useAppSelector(getUpdateUser)
 const isAuthenticated = useAppSelector(getIsAuthenticated)
 const dispatch = useAppDispatch()
console.log(updateUser?.username)
 console.log(isAuthenticated)
      return (
    <div className="d-flex">
    <div className=" p-2 text-light d-none d-lg-block"><a href="/pricing" className="text-light text-decoration-none">Pricing</a></div>
      <div className=" text-light d-none d-lg-block me-auto">
    { updateUser && isAuthenticated ? ( <div onClick={() => dispatch(fetchAsyncLogout())} className="d-flex flex-row p-2">
  <div className="d-flex  pb-5 ">
  <div className=" me-1 text-light fs-6">Logout</div>
  <div className=" text-white ">Hi {updateUser?.firstname.toUpperCase()}</div>
</div>

</div>
) : (<div className=" p-2 text-light"><a href="/login" className="text-light text-decoration-none">Login</a></div>
) }
    </div>  
         
  </div>
    
  )
}

export default NavDashboard