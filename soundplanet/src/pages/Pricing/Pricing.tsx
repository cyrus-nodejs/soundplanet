

import { OverlayTrigger, Container,  Tooltip,  TooltipProps } from "react-bootstrap";
import NavIndex from "../../components/NavBar/NavIndex"
import { RefAttributes, useEffect } from "react"
import NavSearchResults from "../../components/NavBar/NavSearch/NavSearchResults"
import { PRICE} from "../../utils/@types"
import { Link } from "react-router-dom"
import { getIsAuthenticated, getUpdateUser } from "../../redux/features/auth/authSlice"
import {fetchSub, fetchPayment, fetchPrice, getPackageList, getCurrentSub } from "../../redux/features/checkout/checkoutSlice"
import { useAppDispatch, useAppSelector } from "../../redux/app/hook"
import { getSearchTerm } from "../../redux/features/audio/audioSlice"
const Pricing = () => {
 const dispatch = useAppDispatch()


  const currentSub = useAppSelector(getCurrentSub)
  const packages = useAppSelector(getPackageList)
  const searchterm = useAppSelector(getSearchTerm)
  const isauthenticated = useAppSelector(getIsAuthenticated)
  const user = useAppSelector(getUpdateUser)
  
  useEffect(() => {
     
    dispatch(fetchPrice())
    
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchSub())
    
    }, [dispatch]);
     
    const renderTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
      <Tooltip id="button-tooltip" className="tooltip badge text-bg-success bg-succes" {...props}>
        Login to Pay
      </Tooltip>
    );
    
 console.log(packages)

console.log(currentSub)
  return (
    <section className="  ">
      <NavIndex />
   
       <Container className="mt-5 pt-5 mainCenter" fluid>
  {searchterm ? (<NavSearchResults />) : (  <div>
    {currentSub ? (
      <div className="">
           <div className="d-flex justify-content-center ms-auto">
            <div className="flex-col ">
  <div className=" d-flex  fs-4">
  <div className="me-1 text-success ">Subscription: {currentSub?.active ? ("Active") : ('Inactive')}</div>
  <div className=" "><i className='bx text-success  bx-check bx-md'></i></div>
    </div>
    <div className=" d-flex fs-4">
  <div className="me-1 text-success ">Package Plan: {currentSub?.package}</div>
  <div className="me-auto "><i className='bx text-success bx-check bx-md'></i></div>
    </div>
        <div className=" d-flex fs-4">
  <div className="me-1 text-success "> Duration: {currentSub?.duration} days</div>
  <div className="me-auto "><i className='bx  text-success bx-check bx-md'></i></div>
    </div>
    <div className=" d-flex  fs-4">
  <div className="me-1 text-success "> Remaining Days: {currentSub?.daysremaining} </div>
  <div className="me-auto "><i className='bx text-success  bx-check bx-md'></i></div>
    </div>
  
  
</div>
</div>
        <div className="row  row-cols-1 row-cols-md-3 mb-3 text-center">
    {packages?.map((item:PRICE) =>{
          return (
            <div  className="col ">
            <div className="card mb-4  rounded-3 shadow-sm" >
              <div className="card-header pricingbg py-3">
                <h4 className="my-0  fw-normal">{item.plan}</h4>
              </div>
              <div className="card-body pricingbg ">
                <h1 className="card-title text-light pricing-card-title">${item.price}<small className=" text-light fw-light">/mo</small></h1>
                <ul className="list-unstyled mt-3 mb-4">
                  
                  <li>2 GB of storage</li>
                  <li>Email support</li>
                  <li>Help center access</li>
                </ul>
              <button disabled onClick={() => {dispatch(fetchPayment(item))  }}  type="button" className="w-100 btn btn-lg btn-outline-light">Pay Now</button>
              {/* onClick={() =>{addViewedItem(item); addRelatedItem(item) }} */}
              </div>
            </div>
          </div>
       )})}
      
      </div>

    <h2 className="display-6 text-center mb-4">Compare plans</h2>

    <div className="table-responsive">
      <table className="table table-hover table-secondary text-center">
        <thead>
          <tr>
            <th style={{width:' 34%'}}></th>
            <th style={{width: '22%'}}>Free</th>
            <th style={{width: '22%'}}>Pro</th>
            <th style={{width: '22%'}}>Premium</th>
          </tr>
        </thead>
        <tbody className="">
          <tr>
            <th scope="row" className="text-start">Playlist</th>
            <td><i className='bx text-dark bx-check bx-md'></i></td>
            <td><i className='bx text-dark bx-check bx-md'></i></td>
            <td><i className='bx text-dark bx-check bx-md'></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start">Download</th>
            <td></td>
            <td><i className='bx bx-check text-dark bx-md'></i></td>
            <td><i className='bx bx-check bx-md text-dark'></i></td>
          </tr>
        </tbody>

        <tbody>
          <tr>
            <th scope="row" className="text-start">Permissions</th>
            <td><i className='bx bx-check bx-md text-dark'></i></td>
            <td><i className='bx bx-check bx-md text-dark'></i></td>
            <td><i className='bx bx-check bx-md text-dark'></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start">Sharing</th>
            <td></td>
            <td><i className='bx bx-check bx-md text-dark'></i></td>
            <td><i className='bx bx-check bx-md text-dark'></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start">Family Plan</th>
            <td></td>
            <td></td>
            <td><i className='bx bx-check bx-md text-dark'></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start">Extra</th>
            <td></td>
            <td></td>
            <td><i className='bx bx-check bx-md text-dark'></i></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>  ) : ( 
    <div>
    <div className="row  row-cols-1 row-cols-md-3 mb-3 text-center">
    {packages?.map((item:PRICE) =>{
          return (
            <div  className="col ">
            <div className="card mb-4  rounded-3 shadow-sm">
              <div className="card-header pricingbg py-3">
                <h4 className="my-0  fw-normal">{item.plan}</h4>
              </div>
              <div className="card-body pricingbg ">
                <h1 className="card-title text-light pricing-card-title">${item.price}<small className=" text-light fw-light">/mo</small></h1>
                <ul className="list-unstyled mt-3 mb-4">
                  
                  <li>2 GB of storage</li>
                  <li>Email support</li>
                  <li>Help center access</li>
                </ul>
                {isauthenticated && user ? (<button disabled={item?.active} onClick={() => dispatch(fetchPayment(item))  }   type="button" className="w-100 btn btn-lg btn-outline-light"><Link to="/payment" className="text-decoration-none text-success">Pay Now</Link></button>) : (<OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
           <button disabled={item?.active}    type="button" className="w-100 btn btn-lg btn-outline-light"><Link to="/payment" className="text-decoration-none text-success">Pay Now</Link></button>
    </OverlayTrigger>
   )}
              
              {/* onClick={() =>{addViewedItem(item); addRelatedItem(item) }} */}
              </div>
            </div>
          </div>
       )})}
      
      </div>

    <h2 className="display-6 text-center mb-4">Compare plans</h2>

    <div className="table-responsive">
      <table className="table table-hover table-secondary text-center">
        <thead>
          <tr>
            <th style={{width:' 34%'}}></th>
            <th style={{width: '22%'}}>Free</th>
            <th style={{width: '22%'}}>Pro</th>
            <th style={{width: '22%'}}>Premium</th>
          </tr>
        </thead>
        <tbody className="">
          <tr>
            <th scope="row" className="text-start">Playlist</th>
            <td><i className='bx text-dark bx-check bx-md'></i></td>
            <td><i className='bx text-dark bx-check bx-md'></i></td>
            <td><i className='bx text-dark bx-check bx-md'></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start">Download</th>
            <td></td>
            <td><i className='bx bx-check text-dark bx-md'></i></td>
            <td><i className='bx bx-check bx-md text-dark'></i></td>
          </tr>
        </tbody>

        <tbody>
          <tr>
            <th scope="row" className="text-start">Permissions</th>
            <td><i className='bx bx-check bx-md text-dark'></i></td>
            <td><i className='bx bx-check bx-md text-dark'></i></td>
            <td><i className='bx bx-check bx-md text-dark'></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start">Sharing</th>
            <td></td>
            <td><i className='bx bx-check bx-md text-dark'></i></td>
            <td><i className='bx bx-check bx-md text-dark'></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start">Family Plan</th>
            <td></td>
            <td></td>
            <td><i className='bx bx-check bx-md text-dark'></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start">Extra</th>
            <td></td>
            <td></td>
            <td><i className='bx bx-check bx-md text-dark'></i></td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
   )}
   </div>)}

    </Container>  
  </section>
  )
}

export default Pricing;