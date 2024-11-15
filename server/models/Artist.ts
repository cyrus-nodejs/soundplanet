import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ArtistSchema = new Schema({
    artistname: {
        type:String,
        unique:true,
        
     },
     biography: {
        type:String,
        unique:true,
     },
     avatarbg:{
        publicId:{
            type: String,
            unique:true,
        },
        url: {
            type: String,
            required: true,
            unique:true,
        }
    },
    
     following: {
      type: Array,
      required: true,
      ref: 'User'
     },

     tours: {
        type:String,
     },

     
    

  });

  export const Artist:any = mongoose.model("Artist", ArtistSchema);