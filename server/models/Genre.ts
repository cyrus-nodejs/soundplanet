import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const GenreSchema = new Schema({
    title : {
        type: String,
        unique:true,
       },
       genrebg:{
        publicId:{
            type: String,
            required: true,
            unique:true,
        },
        url: {
            type: String,
            required: true,
            unique:true,
        }
    },
   
  });


  export const Genre:any = mongoose.model("Genre", GenreSchema);