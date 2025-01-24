
import express from "express"
import {addPlayedSongs, getPlayedSongs } from "../controllers/Played";
 import { authenticateJWT } from "../middlewares/jwt/verifyToken";

const router = express.Router();


router.get("/getplayed", authenticateJWT, getPlayedSongs);
router.post("/addplayed", authenticateJWT, addPlayedSongs);









export default router;
