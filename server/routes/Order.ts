
import express from "express"
import {getCurrentOrder,  createPayment, config, retrievePayment } from "../controllers/Order";
import { confirmPayment, getcurrentSub } from "../controllers/Subscription";
import { authenticateJWT } from "../middlewares/jwt/verifyToken";
const router = express.Router();

router.get("/config", authenticateJWT, config);
router.get("/retrievepayment", authenticateJWT, retrievePayment)
router.get("/currentorder", authenticateJWT,  getCurrentOrder)
router.get("/currentsub", authenticateJWT,  getcurrentSub)


router.post("/confirmpayment", authenticateJWT,  confirmPayment);
router.post("/createpayment", authenticateJWT, createPayment);










export default router;