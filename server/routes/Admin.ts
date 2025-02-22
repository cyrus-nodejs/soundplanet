
import express from 'express';
import { addPrice } from '../controllers/Pricing';
import {   AssignPremier, AllPremiers, AssignAdmin,
    AllAdmins,  AllOrders,  AllCustomers
 } from '../controllers/Admin';
import { verifyRole, authenticateJWT } from '../middlewares/jwt/verifyToken';
import { upload } from "../utils/storage";

import {addSong, deleteSong, updateSong } from '../controllers/Song'
import {addGenre} from '../controllers/Genre'
import {addArtist} from '../controllers/Artist'
const router = express.Router();



router.post("/addpremier", authenticateJWT, verifyRole(['admin']), AssignPremier );
router.post("/addadmin", authenticateJWT, verifyRole(['admin']), AssignAdmin);

router.get("/alladmins", authenticateJWT, verifyRole(['admin']), AllAdmins );
router.get("/allpremiers", authenticateJWT, verifyRole(['admin']),  AllPremiers);
router.get("/allcustomers", authenticateJWT, verifyRole(['admin']), AllCustomers );
router.get("/allorders", authenticateJWT, verifyRole(['admin']), AllOrders );


router.post("/admin/addsong", authenticateJWT,  verifyRole(['admin']), upload.fields([ { name: 'image', maxCount: 1 },{ name: 'songfile', maxCount: 1 }]) , addSong);
router.post("/admin/addgenre", authenticateJWT,  verifyRole(['admin']), upload.fields([ { name: 'genrebg', maxCount: 1 }, ]) , addGenre);
router.post("/admin/addartist", authenticateJWT,  verifyRole(['admin']), upload.fields([{ name: 'avatar', maxCount: 1 }]) , addArtist);
router.post("/admin/addpricing", authenticateJWT,  verifyRole(['admin']), upload.fields([{ name: 'avatar', maxCount: 1 }]) , addPrice);


router.put("/admin/update/song/:id", authenticateJWT, verifyRole(['admin']),  updateSong);
router.delete("/admin/delete/song/:id", authenticateJWT, verifyRole(['admin']),  deleteSong);











export default router;





