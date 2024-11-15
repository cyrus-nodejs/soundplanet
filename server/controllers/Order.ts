
import 'dotenv/config'
import { Order } from "../models/Order"
import { v4 as uuidv4 } from 'uuid';

import Stripe from "stripe";




const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    apiVersion: "2024-06-20",
    appInfo: {
      name: "soundcity",
      url: "soudcity",
      version: "0.0.2",
    },
    typescript: true,
  });

  export const getCurrentOrder = async (req:any, res:any ) => {
    const owner  = req.user?.id

    try{
        const order = await Order.findOne({owner:owner}).sort({ _id: -1 })
        if(order ){
          res.json({ success: true, message: "View current order!", order:order });
        }
        else{
          res.json({ success: false, message: "No orders yet!" });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}






    
export const createPayment = async (req:any, res: any) => {
    const owner  = req.user.id
    const {plan, bill} = req.body
try{
    
if (owner){
 let   paymentIntent = await stripe.paymentIntents.create({
        amount: bill * 100,
        currency: "usd",
      });
    if (!paymentIntent) throw Error('payment failed!');
    if (paymentIntent){
        const OrderExists = await Order.findOne({paymentid:paymentIntent.id})
        if (OrderExists){
         res.json({success:true, message:"Order Exists"})
        }else{
        const order = await Order.create({
            owner,
            bill:bill,
            orderid:uuidv4(),
            paymentid:paymentIntent.id,
            payment:false,
            package:plan,
        });
    }
        console.log(paymentIntent.client_secret)
        res.json({success:true, message:"Payment intent created!", clientSecret: paymentIntent.client_secret})
    }
}else{
    res.json({sucess:false, message:"No user found"})
}
}catch (err){
console.log(err)
res.json({success:false, message:"Something went wrong"})
}
}


export const retrievePayment = async (req:any, res:any ) => {
    const user  = req.user.id
    const {orderId} = req.body
try{
    const order = await Order.findOne({_id:orderId})
    const paymentId = order.paymentid
    console.log(paymentId)
if (order){
 let   paymentIntent = await stripe.paymentIntents.retrieve(`${paymentId}`);
    if (!paymentIntent) throw Error('payment failed!');
    if (paymentIntent){
        res.json({success:true, message:`Transaction status:${paymentIntent.status}, Amount Paid:$${paymentIntent.amount}`})
    }
}else{
    res.json({sucess:false, message:"Order not found"})
}
}catch (err){
console.log(err)
res.json({success:false, message:"Something went wrong"})
}
}

export const config = async (req:any, res:any ) => {
    const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY
    if(publishableKey) {
        console.log(publishableKey)
        res.json({success:true, message:"Pkey sent!", publishableKey: publishableKey ,
        });
    }else{
        res.json({success:false, message:"No Pkey!", publishableKey: publishableKey ,})
    }
    
   
   
    }