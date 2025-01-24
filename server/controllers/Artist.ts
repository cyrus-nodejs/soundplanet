import { Artist } from "../models/Artist";
import {uploadToCloudinary } from "../utils/cloudinary"


//Get all artists in database
export const  getArtist = async (req:any, res:any ) => {
    try{
        const artists = await Artist.find().sort({ _id: -1 })
        if(artists ){
          res.json({ success: true, message: "View Tracks!", artists:artists });
        }
        else{
          res.json({ success: false, message: "No tracks!" });
        }
  }catch (err){

  }

}


// Save  artist details to  database
 export  const addArtist = async  (req:any, res:any ) => {

    // const files = req.files as { [fieldname: string]: Express.Multer.File[] };
const { artistname,   biography,  tour , following   } = req.body
  
  console.log( artistname,   biography,  tour , following  )
  if (!req.files) {
    // No file was uploaded
    return res.status(400).json({ error: "No file uploaded" });
  }

  // File upload successful
  const avatar = req.files['avatar'][0].path


try {
  let avatarData = {}
  if(avatar){
      const results = await uploadToCloudinary(avatar, "soundassets")
      avatarData = results
  }

      const newArtist = Artist.create({
        artistname,
        avatarbg:avatarData,
        biography,
        tours:tour,
        following,
    })
    return res.json({success:true, message:"artist saved!"})
}catch (err){

}
   


}

   

 
  

 
