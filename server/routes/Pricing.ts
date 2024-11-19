
import express from "express"
import {getPrice, postPrice } from "../controllers/Pricing";
 

const router = express.Router();


router.get("/getprice", getPrice);
router.post("/addpricing",  postPrice);









export default router;
