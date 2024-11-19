
import { Song } from "../models/Song";


import {uploadToCloudinary } from "../utils/cloudinary"





export const  getSong = async (req:any, res:any ) => {
    
    try{
        const songs = await Song.find().sort({ _id: -1 })
        if(songs ){
          res.json({ success: true, message: "View Tracks!", songs:songs });
        }
        else{
          res.json({ success: false, message: "No tracks!" });
        }
  }catch (err){

  }

}


 export  const postSong = async  (req:any, res:any ) => {

    // const files = req.files as { [fieldname: string]: Express.Multer.File[] };
const {title, artistname, genre, duration,  status, biography, album,  topten,  year } = req.body
  
  console.log(album, genre )
  if (!req.files) {
    // No file was uploaded
    return res.status(400).json({ error: "No file uploaded" });
  }

  // File upload successful

  const image = req.files['image'][0].path

   const songfile= req.files['songfile'][0].path

try {
  let imageData = {}
  if(image){
      const results = await uploadToCloudinary(image, "soundassets")
      imageData = results
  }

  
  let songfileData = {}
  if(songfile){
      const results = await uploadToCloudinary(songfile, "soundassets")
      songfileData = results
  }
console.log(imageData, songfileData)
const newItemData = {title, artistname, duration, genre, status, album, songfile:songfileData,  topten, image:imageData, year }
  const newItem = new Song(newItemData)
  newItem.save()


}catch (err){

}
   


}

   

 
  

 


   export  const topTen = async (req:any, res:any ) => {

    await Song.find({topten:"true",}).then(items => res.json(items)).catch(err => res.status(400).json("Error : " + err))
     }

     export  const newSong = async (req:any, res:any ) => {

        await Song.find({year: { $gt: 2022 }}).then(items => res.json(items)).catch(err => res.status(400).json("Error : " + err))
         }

//          export  const Search = async (req:any, res:any ) => {
//           const searchitem = req.query
// await Song.find({ title: { $regex: `${searchitem}`,  $options: "i" }}).then(items => res.json(items)).catch(err => res.status(400).json("Error : " + err))
 
//         }
  

        
        export const  Search = async (req:any, res:any ) => {
          const searchitem = req.query.q
          try{
              const searchresults = await Song.find({ $text : { $search : searchitem }})
              if(searchresults ){
                // { title: { $regex: `${searchitem}`, $options: "i" }}
                
                res.json({ success: true, message: "Search Found !", searchresults:searchresults });
              }
              else{
                res.json({ success: false, message: "No Search found!" });
              }
        }catch (err){
      console.log(err)
        }
      
      }
      

      