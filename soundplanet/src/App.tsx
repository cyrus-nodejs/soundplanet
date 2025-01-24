

import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import * as ContextMenu from "@radix-ui/react-context-menu";
import './App.css'
import AdminDashboard from './pages/Admin/AdminDasboard';
import ResetPassword from "./pages/Auth/ResetPassword";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Report from "./pages/Report";
import Completion from "./pages/Checkout/Completion";
import CurrentOrder from "./pages/Orders/currentOrder";
import ErrorPage from './pages/ErrorPage/Error';
import AddSong from './pages/Admin/AddItem/AdminAddSong';
import Payment from "./pages/Checkout/Payment";
import AllArtists from './pages/Home/HomeCenter/Artists/AllArtists';
import Index from "./pages/Home/Index";
import Pricing from "./pages/Pricing/Pricing";
import AllGenres from "./pages/Home/HomeCenter/Genres/AllGenres";
import AddPricing from "./pages/Admin/AddItem/AdminAddPricing";
import Artistdetails from "./pages/Home/HomeCenter/Artists/Artistdetails";
import AddArtist from "./pages/Admin/AddItem/AdminAddArtist";
import AddGenre from "./pages/Admin/AddItem/AdminAddGenre";
import Genredetails from "./pages/Home/HomeCenter/Genres/GenreDetails";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import AllTopTen from "./pages/Home/HomeCenter/TopTen/AllTopTen";
import AllRecentlyPlayed from "./pages/Home/HomeCenter/RecentlyPlayed/AllRecentlyPlayed";
import AllNewTracks from "./pages/Home/HomeCenter/NewTrack/AllNewTrack";
import 'react-contexify/ReactContexify.css';
import Playlist from "./pages/Playlist/Playlist";

import { useAppDispatch, useAppSelector } from "./redux/app/hook";
import { useEffect } from "react";
import { getAuthUser, fetchGoogleUser  } from "./redux/features/auth/authSlice";
import { getCurrentTrack } from "./redux/features/audio/audioSlice";

function App() {
   const dispatch = useAppDispatch()
  const user = useAppSelector(getAuthUser)
   const currentTrack = useAppSelector(getCurrentTrack)

  const handleContextMenu = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // prevent the default behavior when right-clicked
    console.log("right click");
  };
console.log(currentTrack)
//   useEffect(() => {
    
//     dispatch(fetchAsyncUser());

// }, [dispatch])
  console.log(user)

  useEffect(() => {
    
    dispatch(fetchGoogleUser());

}, [dispatch])
  console.log(user)


  const router = createBrowserRouter([
    {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />
  },
  {
    path: `/register`,
    element: <Register   />,
    errorElement: <ErrorPage />
  },

  {
    path: `/login`,
    element: <Login   />,
    errorElement: <ErrorPage />
  },
  {
    path: `/forgotpassword`,
    element: <ForgotPassword   />,
    errorElement: <ErrorPage />
  },

  {
    path: `/resetpassword/:id`,
    element: <ResetPassword   />,
    errorElement: <ErrorPage />
  },


  {
    path: "/addsong",
    element: <AddSong />,
    errorElement: <ErrorPage />
  },
  {
    path: "/addartist",
    element: <AddArtist />,
    errorElement: <ErrorPage />
  },
  {
    path: "/addpricing",
    element: <AddPricing />,
    errorElement: <ErrorPage />
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    errorElement: <ErrorPage />
  },


  {
    path: "/addgenre",
    element: <AddGenre />,
    errorElement: <ErrorPage />
  },


  {
    path: "/allartists",
    element: <AllArtists />,
    errorElement: <ErrorPage />
  },

  {
    path: "/allgenres",
    element: <AllGenres />,
    errorElement: <ErrorPage />
  },

  {
    path: "/artist/:id",
    element: <Artistdetails />,
    errorElement: <ErrorPage />
  },
  {
    path: "/genre/:id",
    element: <Genredetails />,
    errorElement: <ErrorPage />
  },

  {
    path: "/pricing",
    element: <Pricing />,
    errorElement: <ErrorPage />
  },
  
  {
    path: "/payment",
    element: <Payment/>,
    errorElement: <ErrorPage />
  },
  {
    path: "/completion",
    element: <Completion/>,
    errorElement: <ErrorPage />
  },


  
{
  path: "/currentOrder",
  element: <CurrentOrder/>,
  errorElement: <ErrorPage />
},

{
  path: "/playlist/:id",
  element: <Playlist/>,
  errorElement: <ErrorPage />
},


{
  path: "/newtracks",
  element: <AllNewTracks/>,
  errorElement: <ErrorPage />
},
{
  path: "/topten",
  element: <AllTopTen/>,
  errorElement: <ErrorPage />
},

{
  path: "/recentlyplayed",
  element: <AllRecentlyPlayed/>,
  errorElement: <ErrorPage />
},
{
  path: "/report",
  element: <Report/>,
  errorElement: <ErrorPage />
},








  

  
 
  
])


  return (
  <section className='apphome' >
    < div onContextMenu={handleContextMenu} className=""  >
  <ContextMenu.Root>
			<ContextMenu.Trigger className="ContextMenuTrigger">
      <RouterProvider router={router}  />
			</ContextMenu.Trigger>
      </ContextMenu.Root>
    

    </div>
   </section>
  )
}

export default App
