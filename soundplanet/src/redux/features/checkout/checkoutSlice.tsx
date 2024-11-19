import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit'
import {  ORDER, PRICE, SUB} from '../../../utils/@types'
import { RootState } from '../../app/store'
import axios from 'axios'
import {loadStripe} from '@stripe/stripe-js';

export interface CheckoutState {
  stripePromise:string | null | undefined | unknown ,
  clientSecret:string,
  currentOrder:ORDER | null | undefined | void
  currentSub:SUB | null | undefined | void
  packages:[] | null | undefined | void
  status:  'idle' | 'pending' | 'succeeded' | 'failed'
  error:string | null | undefined
  }

  // Define the initial value for the slice state
const initialState: CheckoutState = {
    stripePromise:'',
    clientSecret:'',
    currentOrder:null,
    currentSub:null,
    packages:null,
    status:  'idle',
    error: null ,
  }
  

// eslint-disable-next-line react-refresh/only-export-components
const BASEURL = import.meta.env.VITE_APP_BASE_URL


export const fetchConfig = createAsyncThunk(
    'checkout/fetchConfig', async () => {
        const response= await axios.get(`${BASEURL}/config`,{ withCredentials: true })
        console.log(response.data.publishableKey)
        return response.data.publishableKey
      });

  export const fetchPayment = createAsyncThunk(
    'checkout/fetchPayment',  async (item:PRICE) => {
        const bill = item.price
            const plan= item.plan
        const response= await axios.post(`${BASEURL}/createpayment`,{bill, plan},{ withCredentials: true })
        console.log(response.data.clientSecret)
        return response.data.clientSecret
      });

      export const fetchOrder = createAsyncThunk(
        'checkout/fetchOrder',  async () => {
            const response= await axios.get(`${BASEURL}/currentorder`,{ withCredentials: true })
            console.log(response.data.order)
            return response.data.order
          });

          export const fetchSub = createAsyncThunk(
            'checkout/fetchSub',  async () => {
                const response= await axios.get(`${BASEURL}/currentsub`,{ withCredentials: true })
                console.log(response.data.subscription)
                return response.data.subscription
              });
              export const fetchPrice= createAsyncThunk(
                'checkout/fetchPrice',  async () => {
                    const response= await axios.get(`${BASEURL}/getprice`,{ withCredentials: true })
                    console.log(response.data.prices)
                    return response.data.prices
                  });
    



// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    
  },
   extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchConfig.pending, (state) => {
      state.status = 'pending'
    })
    .addCase(fetchConfig.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.stripePromise= loadStripe(action.payload)

      })
      .addCase(fetchConfig.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
      .addCase(fetchPayment.pending, (state) => {
      state.status = 'pending'
      })
      .addCase(fetchPayment.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.clientSecret= action.payload
      })
      .addCase(fetchPayment.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
      
      .addCase(fetchOrder.pending, (state) => {
        state.status = 'pending'
        })
        .addCase(fetchOrder.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.currentOrder= action.payload
        })
        .addCase(fetchOrder.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message;
        })
        .addCase(fetchSub.pending, (state) => {
            state.status = 'pending'
            })
            .addCase(fetchSub.fulfilled, (state, action) => {
              state.status = 'succeeded'
              state.currentSub= action.payload
            })
            .addCase(fetchSub.rejected, (state, action) => {
              state.status = 'failed'
              state.error = action.error.message;
            })
            .addCase(fetchPrice.pending, (state) => {
              state.status = 'pending'
              })
              .addCase(fetchPrice.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.packages= action.payload
              })
              .addCase(fetchPrice.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message;
              })
  

    
  },
})

// Export the generated action creators for use in components
export const getStripePromise = (state:RootState) => state.checkout.stripePromise
export const getClientSecret = (state:RootState) => state.checkout.clientSecret
export const getCurrentOrder = (state:RootState) => state.checkout.currentOrder
export const getCurrentSub= (state:RootState) => state.checkout.currentSub
export const getPackageList = (state:RootState) => state.checkout.packages
export const getCheckoutror = (state:RootState) => state.checkout.error
export const getCheckoutStatus = (state:RootState) => state.checkout.status



// Export the slice reducer for use in the store configuration
export default checkoutSlice.reducer;