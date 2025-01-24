import { fetchAdminAllOrders, getAdminAllOrders } from "../../redux/features/admin/adminSlice"
import {   fetchAsyncUser } from "../../redux/features/auth/authSlice"
import { useAppSelector, useAppDispatch } from "../../redux/app/hook"
import { useEffect } from "react"

import { Spinner, Button,  Col,  Row, } from "react-bootstrap"

import { ORDER } from "../../utils/@types"




const AllOrders = () => {
  
const dispatch = useAppDispatch()
const allOrders = useAppSelector(getAdminAllOrders)
// const isAuthenticated = useAppSelector(getIsAuthenticated)
// const authUser = useAppSelector(getAuthUser)
 
useEffect(() =>{
    dispatch(fetchAsyncUser())
    
 
      }, [dispatch])
  
      useEffect(() =>{
        dispatch(fetchAdminAllOrders())
        
      
          }, [dispatch])
      
  
  return (
    <Row  className='' >
    {allOrders && allOrders.length > 0  ? (<div>
      <div>
  <div className="d-inline-flex p-2 fs-4 border-info  border-bottom">All Orders</div>
</div>
    <div  className="row">

    <Col >
       {allOrders ? (<div>{ allOrders?.map((item:ORDER) =>{
     return (
       <Row  className="border border rounded-2 my-4" >
         <div>  <div className="d-flex align-items-start flex-column col-12 border  border-end-0 border-start-0" >
  <div className="mb-auto p-2   ">

  <div className="text-light ms-1 text-start fs-5">Order Id: ${item.orderid}</div>
<div className="text-light ms-1 text-start fs-5">Total: ${item.bill}</div>
<div className="text-light ms-1 text-start fs-5">Payment: {item.payment ? "Successful!" : "Pending" }</div>

<div className="text-light ms-1 text-start fs-5">Plan: ${item.package}</div>
</div>
  </div>
  <div className="row">
 

<div className="col-4">

  <div className="p-2">
  <Button  variant="dark" size="sm" className="rounded-1 px-5 py-2" >
   <a  href={`/orderdetails/${item._id}`} className="p-2 text-decoration-none text-reset">SEE DETAILS</a> 
      </Button>
  </div>
</div>
</div>
</div>
  
     
     
         
         </Row>
         )
  })}
</div>) : (<div className="fs-1 text-center">No Order Found!</div>) }

        
        </Col>
</div>

    </div>):(<div className="fs-4 text-center"><Spinner animation="border" variant="primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner> <p className="fs-4 text-center">Refresh Page</p> </div>)}
   
   
   
  
</Row>
  )
}

export default AllOrders