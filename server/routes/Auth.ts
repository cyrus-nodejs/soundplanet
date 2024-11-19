import express from 'express';

const router = express.Router();
import {
  facebookAuth, facebookRedirect, facebookAuthFailure, facebookAuthSuccess,
  googleAuth,  googleAuthCallback, googleAuthFailure, googleAuthSuccess,
  Register, Login, Logout, 
  ForgotPassword, ResetPassword
 } from "../controllers/Auth";
import {userVerification} from "../middlewares/jwt/verifyToken"




router.get("/login/facebook", facebookAuth);
router.get("/oauth2/redirect/facebook", facebookRedirect);
router.get("/facebook/login/success", facebookAuthSuccess)
router.get("/facebook/login/failure", facebookAuthFailure)




router.get("/auth/google", googleAuth);
router.get("/auth/google/soundplanet", googleAuthCallback);
router.get("/auth/login/success", googleAuthSuccess)
router.get("/auth/login/failure", googleAuthFailure)


  


router.post('/',  userVerification  )
 router.post("/register", Register );
router.post("/login", Login );
router.post("/logout", Logout );
  router.post('/forgotpassword',  ForgotPassword )
  router.post('/resetpassword',  ResetPassword  )
  // router.post('/updatepassword',  UpdatePassword  )
 
  

  






export default router;