
import express from "express"
import {getCurrentOrder,  createPayment, config, retrievePayment } from "../controllers/Order";
import { confirmPayment, getcurrentSub } from "../controllers/Subscription";

const router = express.Router();

router.get("/config", config);
router.get("/retrievepayment",  retrievePayment)
router.get("/currentorder",  getCurrentOrder)
router.get("/currentsub",  getcurrentSub)


router.post("/confirmpayment",  confirmPayment);
router.post("/createpayment", createPayment);










export default router;