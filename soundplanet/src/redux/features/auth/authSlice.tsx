import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit'
import { USER } from '../../../utils/@types'
import { RootState } from '../../app/store'
import axios from 'axios'


export interface AuthState {
    authUser: USER | null | undefined 
    isAuthenticated: boolean
    status:  'idle' | 'pending' | 'succeeded' | 'failed'
    error:string | null | undefined
    message:string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    token:any
  }

  // Define the initial value for the slice state
const initialState: AuthState = {
    authUser: null,
    isAuthenticated: false,
    message:"",
    status: 'idle' ,
    token:null,
    error:null
  }
  

// eslint-disable-next-line react-refresh/only-export-components
const BASEURL = import.meta.env.VITE_APP_BASE_URL


export const fetchAsyncUser = createAsyncThunk(
    'auth/fetchAsyncUser', async () => {
        const response= await axios.post(`${BASEURL}`, {}, { withCredentials: true })
        console.log(response.data.user)
        return response.data.user
      });

      export const fetchLogin = createAsyncThunk(
        'auth/fetchLogin', async (data:{username:string, password:string}) => {
         const { username, password} = data
            const response= await axios.post(`${BASEURL}/login`,{username, password},{ withCredentials: true })
            console.log(response.data)
            return response.data
          });

          export const fetchRegister = createAsyncThunk(
            'auth/fetchRegister', async (data:{firstname:string, lastname:string, email:string, password:string}) => {
           const   {firstname, lastname, email,  password} = data
                const response= await axios.post(`${BASEURL}/register`, {firstname,   lastname, email, password},{ withCredentials: true })
                console.log(response.data)
                return response.data
              });
        

  export const fetchAsyncLogout = createAsyncThunk(
    'auth/fetchAsyncLogout',  async () => {
        const response= await axios.post(`${BASEURL}/logout`,{},{ withCredentials: true })
        console.log(response.data)
        return response.data
      });
      export const fetchForgotPassword = createAsyncThunk(
        'auth/fetchForgotPassword',  async (data:{email:string}) => {
         const {email} = data
            const response= await axios.post(`${BASEURL}/forgotpassword`,{email},{ withCredentials: true })
            console.log(response.data)
            return response.data
          });
          export const fetchResetPassword = createAsyncThunk(
            'auth/fetchResetPassword',  async (data:{username:string, password:string, token:string}) => {
               const {username, password, token} = data
               
               
              const response= await axios.post(`${BASEURL}/resetpassword`,{username, password, token},{ withCredentials: true })
                console.log(response.data)
                return response.data
              });
            

          export const fetchGoogleUser = createAsyncThunk(
            // 'auth/fetchGoogleUser', async () => {
            //   window.location.href = `${BASEURL}/auth/google`
            //   }
            'auth/fetchGoogleUser', async () => {
              const response= await axios.get(`${BASEURL}/getgoogleuser`, { withCredentials: true })
              console.log(response.data.user)
              return response.data.user
            }
          );

         
// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

  },
   extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAsyncUser.pending, (state) => {
      state.status = 'pending'
      
    })
    .addCase(fetchAsyncUser.fulfilled, (state, action) => {
         state.authUser= action.payload
         state.isAuthenticated = true
        
      })
      .addCase(fetchAsyncUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
        
      })
      builder.addCase(fetchGoogleUser.pending, (state) => {
        state.status = 'pending'
        
      })
      .addCase(fetchGoogleUser.fulfilled, (state, action) => {
           state.authUser= action.payload
           state.isAuthenticated = true
          
        })
        .addCase(fetchGoogleUser.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message;
          
        })
      .addCase(fetchAsyncLogout.pending, (state) => {
      state.status = 'pending'
      state.authUser= null
      
      })
      .addCase(fetchAsyncLogout.fulfilled, (state) => {
      state.status = 'succeeded'
      })
      .addCase(fetchAsyncLogout.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
      .addCase(fetchLogin.pending, (state) => {
        state.status = 'pending'
        })
        .addCase(fetchLogin.fulfilled, (state, action) => {
          state.isAuthenticated = true
          state.authUser = action.payload.user
          state.message= action.payload.message
          
        })
        .addCase(fetchLogin.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message;
        })
        .addCase(fetchRegister.pending, (state) => {
      state.status = 'pending'
     
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.message= action.payload.message
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
      
     
      .addCase(fetchForgotPassword.pending, (state) => {
        state.status = 'pending'
        
        })
        .addCase(fetchForgotPassword.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.message = action.payload.message
        })
        .addCase(fetchForgotPassword.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message;
          
        })
        .addCase(fetchResetPassword.pending, (state) => {
          state.status = 'pending'
          })
          .addCase(fetchResetPassword.fulfilled, (state, action) => {
            state.isAuthenticated = true
            state.message= action.payload.message
            
          })
          .addCase(fetchResetPassword.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message;
          })
     
    
  },
})

// Export the generated action creators for use in components
export const getAuthUser = (state:RootState) => state.auth.authUser
export const getIsAuthenticated = (state:RootState) => state.auth.isAuthenticated
export const getAuthError = (state:RootState) => state.auth.error
export const getAuthStatus = (state:RootState) => state.auth.status

export const getMessage =(state:RootState) => state.auth.message

// Export the slice reducer for use in the store configuration
export default authSlice.reducer;