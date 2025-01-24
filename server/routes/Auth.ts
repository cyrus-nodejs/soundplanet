import express from 'express';

const router = express.Router();
import {
  googleAuth,  googleAuthCallback, getGoogleUser,
  Register, Login, Logout, 
  ForgotPassword, ResetPassword, getAuthUser
 } from "../controllers/Auth";
import {authenticateJWT} from "../middlewares/jwt/verifyToken"







router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", googleAuthCallback);
router.get("/getgoogleuser", getGoogleUser);

router.post('/', getAuthUser   )
router.post("/register", Register );
router.post("/login", Login );
router.post("/logout", Logout );
  router.post('/forgotpassword',  ForgotPassword )
  router.post('/resetpassword',  ResetPassword  )
  // router.post('/updatepassword',  UpdatePassword  )
 
  

  






export default router;