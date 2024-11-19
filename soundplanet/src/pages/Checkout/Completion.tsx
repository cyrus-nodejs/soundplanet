
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import {useEffect, useState} from 'react';

import {  Button, Container } from 'react-bootstrap';


import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../../redux/app/hook';
import {fetchConfig, getStripePromise } from '../../redux/features/checkout/checkoutSlice';
function Completion() {
  

  const [ messageBody, setMessageBody ] = useState(null);
  const [ message, setMessage ] = useState(null);

 const [paymentIntent, setPaymentIntent] = useState("")
 const dispatch = useAppDispatch()
 const stripePromise  = useAppSelector(getStripePromise)
 useEffect(() =>{
  dispatch(fetchConfig())
    }, [dispatch])

 useEffect(() => {
  if (!stripePromise) return;

  stripePromise.then(async (stripe: { retrievePaymentIntent: (arg0: string | null) => PromiseLike<{ error: unknown; paymentIntent: unknown; }> | { error: unknown; paymentIntent: unknown; }; }) => {
    const url  = new URL(window.location);
    const clientSecret = url.searchParams.get('payment_intent_client_secret');
    console.log(clientSecret)
    const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
    setPaymentIntent(paymentIntent)
    setMessageBody(error ? ` ${error.message}` : 
      <> Payment {paymentIntent.status}: <a href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`} target="_blank" rel="noreferrer">{paymentIntent.id}</a></>
    );
  });
}, [stripePromise]);

console.log(stripePromise)
  const confirmPayment = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/confirmpayment",
        {
       paymentIntent,
        },
        {withCredentials: true}
      );
      
      const { success, message} = data;
      if (success) {
        alert(message)
        setMessage(message)
        
      console.log(message)
        
      } else {
        console.log(message);
        
      
       
      }
    } catch (error) {
      console.log(error)
    
    }
  }

  return (
    <section className="  ">
      
      <Container className="mt-5 pt-5 mainCenter" fluid>
      <h1>Thank you!</h1>
      <div id="messages" role="alert" className="fs-2" style={messageBody ? {display: 'block'} : {}}>{messageBody}</div>
      <div className="">
        
      {paymentIntent ? ( <div className="mx-5 px-5 col-6">
        <p className=' fs-1'>Payment Successful!</p>
        
        <Button variant="dark" className="shadow-none  rounded-1" size="lg" type="submit" onClick={confirmPayment} >
         <Link to="/currentorder"  className="text-decoration-none text-light">
          Next
          </Link>
         </Button>
         {message && (<div>
          
      <p> <span className="text-danger fs-2">{message}</span><Link to="/" className=" fs-2 " >Back to Home</Link></p>
         </div>)}
         </div>  
      ) : (
        <div className="mx-5 px-5 col-6">
        <p className='p-3 fs-1'>Payment Failed! try again!</p>
    <Button variant="dark" className="shadow-none p-3 col-3 mb-2 rounded-1" size="lg" type="submit"  >
      <Link to="/payment"  className="text-decoration-none text-light">
      TRY AGAIN!
       </Link>
      </Button></div >)}

     
      
      
    </div>
    </Container>
    </section>
  );
}

export default Completion;