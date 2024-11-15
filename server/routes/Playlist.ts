
import express from "express"
import {updatePlaylistTitle, clearPlaylist, createPlaylist, getCurrentPlaylist, getPlaylist, addToPlaylist, deleteFromPlaylist, deletePlaylist} from "../controllers/Playlist";
 

const router = express.Router();


router.get("/playlist", getPlaylist);
router.get("/playlist/:id",  getCurrentPlaylist);
router.post("/createplaylist",  createPlaylist);
router.post("/addtoplaylist",  addToPlaylist);
router.post("/deletefromplaylist",  deleteFromPlaylist);
router.post("/deleteplaylist",  deletePlaylist);
router.post("/clearplaylist",  clearPlaylist);
router.post("/updatetitle",  updatePlaylistTitle);








export default router;
