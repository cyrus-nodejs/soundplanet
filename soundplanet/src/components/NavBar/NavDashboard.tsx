

import { useAppDispatch, useAppSelector } from "../../redux/app/hook";
import { fetchAsyncLogout ,  getAuthUser} from "../../redux/features/auth/authSlice";
import { getIsAuthenticated } from "../../redux/features/auth/authSlice";

const NavDashboard = () => {
    
 const authUser = useAppSelector(getAuthUser)
 const isAuthenticated = useAppSelector(getIsAuthenticated)
 const dispatch = useAppDispatch()


      return (
    <div className="d-flex">
      { isAuthenticated && authUser?.role === 'admin' && (
  <a href='/admin/dashboard' className='text-decoration-none'><div className="" >


  <div className="p-2 text-light fw-medium ">Admin</div>
  

</div></a>
)}  


    <div className=" p-2 text-light d-none d-lg-block"><a href="/pricing" className="text-light  fw-medium p-2 text-decoration-none">Pricing</a></div>
      <div className=" text-light d-none d-lg-block me-auto">
    { authUser && isAuthenticated ? ( <div onClick={() => dispatch(fetchAsyncLogout())} className="d-flex flex-row p-2">

  <div className=" me-1 text-light fw-medium fs-6">Logout</div>
  <div className=" text-white ">Hi {authUser?.firstname.toUpperCase()}</div>


</div>
) : (<a href="/login" className="text-light text-decoration-none"><div className="d-flex flex-row  p-2 text-light">
  <div className='me-1'>Login</div>
<div className=''>Hi Guest</div>
</div></a>
) }
    </div>  
         
  </div>
    
  )
}

export default NavDashboard