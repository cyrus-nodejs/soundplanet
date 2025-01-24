

import { Song } from "../models/Song"
import { Played } from "../models/Played"

// save played song to database
export  const addPlayedSongs = async (req:any, res:any ) => {
  const owner = req.user.id
    const {itemId} = req.body

 
    try{
      const played = await Played.findOne({owner:owner})
        const song = await Song.findOne({_id:itemId})
   
console.log(played)
if (!owner) {
  res.status(404).send({message:"Acess Denied"})
}
if (!song) {
  res.status(404).send({message:"song not found!"})
}

      if (played){
        
        const filter = {owner: owner }
        const update = {$addToSet:{item : song}}
         const doc = await Played.findOneAndUpdate(filter, update, 
          {new:true, upsert:true,  includeResultMetadata: true})
          doc.save
        res.json({ success: true, message: "Item added to Recently Played List!" });
        
      }else{
         await Played.create({
          owner,
          item:song,
      });

  res.json({success:true, message:"recntly played created!"})
  }

}catch (err){
console.log(err)
}
}

//Retrieve played songs from database

export const getPlayedSongs = async (req:any, res:any ) => {
           
    const owner  = req.user?.id

    try{
      console.log(owner)
       const  song = await Played.findOne({owner:owner})
        if(song ){
          console.log(`soc ${song}`)
          res.json({ success: true, message: "Recently Played!", song:song});
        }
        else{
          res.json({ success: false, message: "No Recenty Played!" });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}
