import mongoose from "mongoose";
const Schema = mongoose.Schema;




const SubscriptionSchema = new Schema({
    owner: {
        type: String,
        required: true,
        ref: 'User'

    },



    bill: {
        type: Number,
        required: true
    },
    paymentid: {
        type: String,
    },
    
    active:{
        type: String ,
        default:"Free",

        
    },
    package:{
        type: String,
    },
    duration:{
        type: Number,
        default:30,
        
    },
 
    daysremaining:{
        type:Number,
     },
     subdate:{
        type:Date,
    },
expireAt: {
    type: Date, 
}

})


SubscriptionSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
export const Subscription : any = mongoose.model("Subscription", SubscriptionSchema)


