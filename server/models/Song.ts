import mongoose from 'mongoose';

const Schema = mongoose.Schema;



const SongSchema = new Schema({
    title:{
       type:String,
       required:true,
       unique:true,
    },
    
    artistname:{
        type:String,
        required:true,
    },
    genre:{
        type:String,
        required:true,
    },
    status:{
        type:String,
    },
    album:{
        type:String,
    },

    songfile:{
        publicId:{
            type: String,
            required: true,
            unique:true
        },
        url: {
            type: String,
            required: true,
            unique:true
        }
    },
    image:{
        publicId:{
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    year:{
        type:String,
        
    },
    duration:{
type:String,
    },
   topten:{
    type:String,
   },
   likes:{
    type:String,
   },
    date_added:{
        type:Date,
        default:Date.now
    },
})

SongSchema.index({ title: 'text', artistname: 'text', genre: 'text', album: 'text' });

export const Song:any = mongoose.model("Song", SongSchema);


