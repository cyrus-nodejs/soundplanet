import {Col, Nav,Row, Tab, Container } from 'react-bootstrap'
import { useEffect } from 'react';

// import Home from '../Home/Home';
import NavIndex from '../../components/NavBar/NavIndex';
import AllSongs from './AllSongs';
import AllCustomers from './AllCustomers';
import AllPremiers from './AllPremiers';
import AllOrders from './AllOrders';
import AllAdmins from './AllAdmins';
import AssignAdmin from './Assign/AddAdmin';
import AssignPremier from './Assign/AddPremier';
import AddArtist from './AddItem/AdminAddArtist';
import AddGenre from './AddItem/AdminAddGenre';
import AddPricing from './AddItem/AdminAddPricing';
import AddSong from './AddItem/AdminAddSong';
import { fetchAsyncUser, getAuthUser} from '../../redux/features/auth/authSlice';
import { getSongs } from '../../redux/features/audio/audioSlice';
import { getAdminAllAdmins, getAdminAllOrders,  getAdminAllCustomers,
     getAdminAllPremiers } from '../../redux/features/admin/adminSlice';
import { useAppSelector, useAppDispatch } from '../../redux/app/hook';


function AdminDashboard () {
    
    const dispatch = useAppDispatch()
    const allsongs = useAppSelector(getSongs)
    const allcustomers = useAppSelector(getAdminAllCustomers)

    const allorders = useAppSelector(getAdminAllOrders)
    const alladmins = useAppSelector(getAdminAllAdmins)
    const allpremiers = useAppSelector(getAdminAllPremiers)

const allAdmins = useAppSelector(getAdminAllAdmins)

const authUser =  useAppSelector(getAuthUser)
 console.log(allAdmins)
// const permission = "Require Admin"
useEffect(() =>{
    dispatch(fetchAsyncUser())
   
      }, [dispatch])
  
  return (
    <section>
      <NavIndex />
       <Container className="" fluid>
       { authUser?.role === 'admin' ? (
        <Row className="px-5">
            <p className='text-center fs-4 fw-bold '>ADMIN DASHBOARD</p>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className='mt-5'>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">All Songs ({allsongs.length}) </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">All Customers ({allcustomers.length})</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">All Premier ({allpremiers.length})</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fourth">All Orders ({allorders.length})</Nav.Link>
                </Nav.Item>
              
                <Nav.Item>
                  <Nav.Link eventKey="sixth">All Admins ({alladmins.length})</Nav.Link>
                </Nav.Item>
               
            
                <Nav.Item>
               <Nav.Link  eventKey="seventh">Assign  Admin role</Nav.Link>
                </Nav.Item>
            
                <Nav.Item>
                 <Nav.Link eventKey="eighth" >Assign    Premier role</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="ninth" >Add Artist</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="tenth">Add Song </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="eleventh">Add Price </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="twelveth">Add Genre </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first"><AllSongs /></Tab.Pane>
                <Tab.Pane eventKey="second"><AllCustomers /></Tab.Pane>
                <Tab.Pane eventKey="third"><AllPremiers /></Tab.Pane>
                <Tab.Pane eventKey="fourth"><AllOrders /></Tab.Pane>
                <Tab.Pane eventKey="sixth"><AllAdmins /></Tab.Pane>
                <Tab.Pane eventKey="seventh"><AssignAdmin /></Tab.Pane>
                <Tab.Pane eventKey="eighth"><AssignPremier/></Tab.Pane>
                <Tab.Pane eventKey="ninth"><AddArtist/></Tab.Pane>
                <Tab.Pane eventKey="tenth"><AddSong /></Tab.Pane>
                <Tab.Pane eventKey="eleventh"><AddPricing /></Tab.Pane>
                <Tab.Pane eventKey="twelveth"><AddGenre /></Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
        </Row>
       ) : (<div className="fs-1 text-center text danger m-5">You do not have the required Permission!</div>) }
    
        
      
    </Container>
    </section>
  );
}

export default AdminDashboard;