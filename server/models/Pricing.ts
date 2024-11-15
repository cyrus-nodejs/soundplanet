import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const PricingSchema = new Schema({
    plan : {
        type: String,
        unique:true,
       },
       price:{
        type: String,
    },
    duration:{
        type:String,
    },
    active:{
        type:Boolean,
        default:false,
    },
    subcribers:{
        type:Number,
    }
    
   
  });

  
  export const Pricing:any = mongoose.model("Pricing", PricingSchema);