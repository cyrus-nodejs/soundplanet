
// importing modules
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';


const UserSchema = new Schema({
    email:{
        type:String,
        unique:true,
       lowercase:true,
    },  

     
    username:{
                 type:String,
                 unique:true,
            },
            firstname:{
                type:String,
           },
           lastname:{
            type:String,
       },
   
   age:{
    type:String,
  
},
googleId:{
    type:String,
},

profilePicture:{
    publicId:{
        type: String,
      
    },
    url: {
        type: String,
     
    }
},
country:{
    type:String,
  
},
role:{
    type:String,
    enum: [ 'customer', 'premier','admin'],
    default:'customer'
   },

         token:{
                type:String,
                unique:true,
                

           },

             register_date:{
                type:Date,
                 default: Date.now
             },

        
})


 UserSchema.plugin(passportLocalMongoose);
 


 export const User:any = mongoose.model("User", UserSchema);


 



 

 
