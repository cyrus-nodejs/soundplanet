
import express from "express"
import {newSong, topTen,    Search,  getSong   } from "../controllers/Song";
 import {getArtist} from "../controllers/Artist"
 import {getGenre} from "../controllers/Genre"
import { upload } from "../utils/storage";
import { authenticateJWT } from "../middlewares/jwt/verifyToken";

const router = express.Router();


router.get("/songs", getSong);
router.get("/artists",  getArtist);
router.get("/genres",  getGenre);
router.get("/newsong",  newSong);
router.get("/topten",  topTen);
router.get("/search",  Search);
// upload.single("image")
// upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])

export default router;
