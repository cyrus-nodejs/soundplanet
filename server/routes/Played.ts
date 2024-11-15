
import express from "express"
import {addPlayedSongs, getPlayedSongs } from "../controllers/Played";
 

const router = express.Router();


router.get("/getplayed", getPlayedSongs);
router.post("/addplayed",  addPlayedSongs);









export default router;
