import { Order } from "../models/Order"
import { Subscription } from "../models/Subscription"
import {daysRemaining} from "../utils/timecalculator"

//Retrieve current subscription
export const getcurrentSub = async (req:any, res:any ) => {
    const owner  = req.user?.id

    try{
        const subscription = await Subscription.findOne({owner:owner})
        if(subscription ){
            console.log(subscription)
          res.json({ success: true, message: "View Subscriptions!", subscription:subscription});
        
        }
        else{
          res.json({ success: false, message: "No active subscription" });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}


// Confirm payment

export const confirmPayment = async (req:any, res:any ) => {
    const owner = req.user.id
    const {paymentIntent} = req.body
    console.log(paymentIntent)
    const order = await Order.findOne({paymentid:paymentIntent.id})
    const d = new Date()
    d.setDate(d.getDate()+ 30);
    const expirytime = new Date(d)
    
    
    

try{
if (order){
    if (paymentIntent.status == 'succeeded'){
        const subExists = await Subscription.findOne({paymentid:paymentIntent.id})
       if (subExists){
        res.json({success:true, message:"Payment already Validated!"})
       }else{
       
         const order =   await Order.findOne({owner:owner, payment:false, paymentid:paymentIntent.id}) 
         order.payment=true
         order.save()


          const sub = await Subscription.create({
            owner,
            bill:order.bill,
            paymentid:order.paymentid,
            active:order.package,
            package:order.package,
            subdate:new Date(),
            expireAt:expirytime,
            daysremaining:daysRemaining(expirytime, new Date())
        });
       
        res.json({success:true, message:"Payment Success!"})
       }
        
    }else{
        res.json({success:false, message:" Payment not validated!"})
    }
}else{
    res.json({sucess:false, message:"No Order found!"})
}
}catch (err){
console.log(err)
res.json({success:false, message:"Something went wrong"})
}
}
