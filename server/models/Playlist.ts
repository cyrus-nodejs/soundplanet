import { timeStamp } from "console";

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
    owner : {
        type: String,
         required: true,
         ref: 'User'
       },
       title:{
        type:String,
        default:"My Playlist",
       },

       item:{
       type: Array,
        ref: 'Song' 
   }
       },
       {
        timestamps: true
  }
);


export const Playlist: any = mongoose.model("Playlist", PlaylistSchema);
