
import express from "express"
import {newSong, topTen,    Search,  getSong,  postSong } from "../controllers/Song";
 import {postArtist, getArtist} from "../controllers/Artist"
 import {postGenre, getGenre} from "../controllers/Genre"
import { upload } from "../utils/storage";
const router = express.Router();


router.get("/songs", getSong);
router.get("/artists",  getArtist);
router.get("/genres",  getGenre);
router.get("/newsong",  newSong);
router.get("/topten",  topTen);
router.get("/search",  Search);
// upload.single("image")
// upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
router.post("/addsong", upload.fields([ { name: 'image', maxCount: 1 },{ name: 'songfile', maxCount: 1 }]) , postSong);
router.post("/addgenre", upload.fields([ { name: 'genrebg', maxCount: 1 }, ]) , postGenre);
router.post("/addartist", upload.fields([{ name: 'avatar', maxCount: 1 }]) , postArtist);

export default router;
