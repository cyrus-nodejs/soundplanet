
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { Request, Response, Errback, NextFunction  } from "express";


// verify jwt authentication 
export const authenticateJWT =   (req:any,  res:any, next:any) => {
    const Token = req.cookies.soundToken
    console.log(`verifytoken => ${Token}`)
     if (!Token){
         return res.json({success:false,  message:"No Access Token! "})
     }
     jwt.verify(Token, process.env.TOKEN_KEY!, async (err:any, user:any) => {
         if(err){
             return res.json({success:false,  message:`Invalid or expired token!`})
         }
            next()
             
     })
  
  
  }
  
  //Verify User Role
export const verifyRole =  (roles: string | any[]) => {
    return (req:any, res:any, next:any) => {
      if (!roles.includes(req.user?.role)) {
        return res.json({success:false, message: `Access denied. ${req.user.role } access level required!` });
      }
      next();
    };
  };


  //Authorize Users
//Verify Forgot Password JWT
export const forgotPasswordVerification = (req:Request,  res:Response, next:NextFunction) => {
    const token = req.cookies.token
//    console.log(`verifytoken => ${token}`)
    if (!token){
        return res.json({success:false,  message:"Not Authorized! Token does not exist"})
    }
    jwt.verify(token, process.env.TOKEN_KEY!, async (err:any, data:any) => {
        if(err){
            return res.json({success:false,  message:`Cannot verify token + ${err}`})
        
        }else{
            const user = req.user
            if (user) return res.json({ success: true, message:`Welcome ${user}`, user: user })
                else return res.json({ success: false, message:"Not Authorized!" })
        }
   
    })
  next()  
}

