import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AudioPlayerProvider } from './context/audioPlayer.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

import 'react-contexify/ReactContexify.css';
import { Provider } from 'react-redux';
import {store} from "../src/redux/app/store.tsx"
import { FacebookProvider } from 'react-facebook';
import { CookiesProvider } from 'react-cookie';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AudioPlayerProvider>
  
      <Provider store={store}>
      <FacebookProvider appId={import.meta.env.VITE_APP_FACEBOOK_CLIENT_ID}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
    <App />
    </CookiesProvider>

    </GoogleOAuthProvider>
  </FacebookProvider>
    </Provider>
    
   
    </AudioPlayerProvider>
  </StrictMode>,
)
