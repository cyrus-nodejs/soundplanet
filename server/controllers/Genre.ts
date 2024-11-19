import { Genre } from "../models/Genre";
import {uploadToCloudinary } from "../utils/cloudinary"



export const  getGenre = async (req:any, res:any ) => {
    // await Song.find().sort({date:-1}).then(songs => res.json(songs)).catch(err => res.json("Error : " + err));
    try{
        const genres = await Genre.find().sort({ _id: -1 })
        if(genres ){
          res.json({ success: true, message: "View genres!", genres:genres });
        }
        else{
          res.json({ success: false, message: "No tracks!" });
        }
  }catch (err){

  }

}


 export  const postGenre = async  (req:any, res:any ) => {

    // const files = req.files as { [fieldname: string]: Express.Multer.File[] };
const { title } = req.body
  
  console.log(title )
  if (!req.files) {
    // No file was uploaded
    return res.status(400).json({ error: "No file uploaded" });
  }

  // File upload successful

  
  const genrebg = req.files['genrebg'][0].path
   

try {
 
  let genrebgData = {}
  if(genrebg){
      const results = await uploadToCloudinary(genrebg, "soundassets")
      genrebgData = results
  }
  

  const newGenre = Genre.create({
    title,
     genrebg:genrebgData, 
     
  })
  
  return res.json({success:true, message:"Genre  saved!"})



}catch (err){

}
   


}

   

 
  
