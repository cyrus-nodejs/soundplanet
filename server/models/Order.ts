import mongoose from "mongoose";
const Schema = mongoose.Schema;




const OrderSchema = new Schema({
    owner: {
        type: String,
        required: true,
        ref: 'User'

    },

    orderid:{
        type:String,
        required: true,
    },

    bill: {
        type: Number,
        required: true
    },
    paymentid: {
        type: String,
    },
    
    payment:{
        type: Boolean ,
        default:false,
        
    },
    package:{
        type: String,
    },

    date_added: {
        type: Date,
        default: Date.now
    }
})
export const Order : any = mongoose.model("Order", OrderSchema)


