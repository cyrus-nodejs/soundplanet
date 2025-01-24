import { Song } from "../models/Song";
import { Playlist } from "../models/Playlist";

//Retrieve playlist from database
export const getPlaylist = async (req:any, res: any) =>{
    const owner  = req.user?.id
    try{
        let playlist = await Playlist.find({owner:owner});
        if(playlist ){
        
          res.json({ success: true, message: "View Playlist!", playlist:playlist });
        }
        else{
          res.json({ success: false, message: "empty !" });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

// Retrieve selected  playlist
export const getCurrentPlaylist = async (req:any, res:any ) => {
  const owner  = req.user?.id
console.log(req.params.id)
try{
  let playlist = await Playlist.findOne({owner:owner, _id:req.params.id});
  if(playlist ){
    res.json({ success: true, message: "View Playlist!", playlist:playlist });
  }
  else{
    res.json({ success: false, message: "empty !" });
  }
}
catch(err){
  console.log(err);
  res.status(500).send("Something went wrong");
}
  // await Playlist.findById(req.params.id).then((items: any) =>  res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))
 
  
  }

// create new playlist
export const createPlaylist = async  (req:any, res:any) => {
    const {title}= req.body
    console.log(title)
    const owner = req.user.id
    let playlist = await Playlist.findOne({owner:owner, title:title});
  try{
   
    if(playlist) {
       
      res.json({success:false, message:"Title already exists"})
    }else{
      const newPlaylist = Playlist.create({
        owner,
        title
    })
    return  res.json({ success: true, message: "New playlist created!", playlist:newPlaylist }) ;
    }
  

  }catch (err){
console.log(err)
  }


}

// change selected playlist name
export const updatePlaylistTitle = async (req:any, res:any ) => {
  const owner = req.user.id
  const {title, playlistId}= req.body
try{

 const playlist =await  Playlist.findOne({owner:owner, _id:playlistId})

if (playlist){
const filter = {owner: owner, _id:playlistId }
  const update = {title:title}
   const doc = await Playlist.findOneAndUpdate(filter, update, 
    {new:true, upsert:true,  includeResultMetadata: true})
    doc.save
  res.json({ success: true, message: "Title Changed!" , });
   }else {
      res.json({ success: false, message: "Playlist not found!" , playlist:playlist  });
}
}catch (err){
  console.log(err);
  res.status(500).send("something went wrong");

}
}

// add songs to selected playlist
export const addToPlaylist = async (req:any, res:any ) => {
    const owner = req.user.id
    const {itemId, playlistId}= req.body
try{
  
   const playlist =await  Playlist.findOne({owner:owner, _id:playlistId})
   const song = await Song.findOne({_id:itemId})
   console.log(song, itemId, playlistId)
  if (!song) {
    res.status(404).send({message:"song not found!"})
  }
  
 if (playlist){
  const filter = {owner: owner, _id:playlistId }
    const update = {$addToSet:{item : song }}
     const doc = await Playlist.findOneAndUpdate(filter, update, 
      {new:true, upsert:true,  includeResultMetadata: true})
      doc.save
    res.json({ success: true, message: "Song added to playlist!" , });
     }else {
        res.json({ success: false, message: "Playlist not found!" , });
 }
}catch (err){
    console.log(err);
    res.status(500).send("something went wrong");
 
}
}
// Remove song from selected playlist
export const deleteFromPlaylist = async (req:any, res:any ) => {
 const owner = req.user.id
     const {itemId, playlistId}= req.body
 try{
let playlist = await Playlist.findOne({owner: owner, _id:playlistId });
const itemIndex = playlist.item.findIndex((item: any) => item._id == itemId);
console.log(itemIndex)
if (itemIndex > -1) {
  playlist.item.splice(itemIndex, 1);
   playlist.save()
  res.json({ success: true, message: "Song removed from Playlist!", playlist:playlist  });
}else{
  res.json({ success: false, message: "Song not found!" });
}
 
}catch (error) {
    console.log(error);
    res.status(400).send();
 }
}

// Empty selected playlist
export const clearPlaylist = async (req:any, res:any ) => {
  const {playlistId} = req.body
  const owner = req.user.id
try{
  let playlist = await Playlist.findOne({owner: owner, _id:playlistId });
  if (playlist){
    
    playlist.item = []
    playlist.save()
    res.json({ success: true, message: "Playlist Cleared!", playlist:playlist  });
  }else{
    res.json({ success: false, message: "No playlist exist!" });
  }

}catch (error) {
 console.log(error);
 res.status(400).send();
}
 }
 
// delete selected playlist
export const deletePlaylist = async (req:any, res:any ) => {
  const {playlistId} = req.body
  const owner = req.user.id
try{
  let playlist = await Playlist.findOne({owner: owner, _id:playlistId });
  if (playlist){
    await Playlist.findOneAndDelete({owner: owner, _id:playlistId });
    res.json({ success: true, message: "Playlist deleted!", playlist:playlist });
  }else{
    res.json({ success: false, message: "No playlist exist!" });
  }

}catch (error) {
 console.log(error);
 res.status(400).send();
}
 }
 

