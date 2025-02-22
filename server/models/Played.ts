import { timeStamp } from "console";

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PlayedSchema = new Schema({
    owner : {
        type: String,
         required: true,
         ref: 'User'
       },
       item:{type: Array}, 
  expireAt: {
    type: Date, 
}
}
);
PlayedSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export const Played: any = mongoose.model("Played", PlayedSchema);
