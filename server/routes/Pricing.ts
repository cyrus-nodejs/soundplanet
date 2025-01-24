
import express from "express"
import {getPrice } from "../controllers/Pricing";
 import { authenticateJWT } from "../middlewares/jwt/verifyToken";

const router = express.Router();


router.get("/getprice", getPrice);








export default router;
