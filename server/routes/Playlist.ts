
import express from "express"
import {updatePlaylistTitle, clearPlaylist, createPlaylist, getCurrentPlaylist, getPlaylist, addToPlaylist, deleteFromPlaylist, deletePlaylist} from "../controllers/Playlist";
 import { authenticateJWT } from "../middlewares/jwt/verifyToken";

const router = express.Router();


router.get("/playlist", authenticateJWT, getPlaylist);
router.get("/playlist/:id", authenticateJWT, getCurrentPlaylist);
router.post("/createplaylist", authenticateJWT,  createPlaylist);
router.post("/addtoplaylist", authenticateJWT, addToPlaylist);
router.post("/deletefromplaylist", authenticateJWT,  deleteFromPlaylist);
router.post("/deleteplaylist",  authenticateJWT, deletePlaylist);
router.post("/clearplaylist", authenticateJWT, clearPlaylist);
router.post("/updatetitle", authenticateJWT, updatePlaylistTitle);








export default router;
