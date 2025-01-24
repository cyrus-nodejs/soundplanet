
import { Request, Response, Errback, NextFunction  } from "express";
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import {User} from  '../models/User'
import passport from "../middlewares/passport/index"
import {createSecretToken,  forgotPasswordToken} from "../middlewares/jwt/createSecretToken"
import {contactEmail} from "../utils/nodemailer"
import {getUserByFacebookIdAndAccessToken} from "../utils/helpers"


//Sign up and save user to database
export const Register = async  (req:any, res:any, next:NextFunction) => {
    try{ 
        User.register(new User({ email: req.body.email, username:req.body.email, firstname:req.body.firstname, lastname:req.body.lastname }), req.body.password, function (err: string, user: any) { 
            if (err) { 
                res.json({ success: false, message:  err }); 
            } 
            else { 
            req.login(user, (err: any) => { 
            
                    if (err) { 
                        res.json({ success: false, message: err }); 
                    } 
                    else { 
                        console.log(req.user)
                        res.json({ success: true, message: "Sign up Success! Proceed to Login page!" }); 
                        // res.json({ success: true, message: "Your account has been saved" }); 
                    } 
                }); 
            } 
        }) 
        
    }catch(error){
     console.log(error)
    }

}

//authenticate user
export const Login = async (req:any, res:any ) => {
    try {
       
        if(!req.body.username){ 
            res.json({success: false, message: "Username was not given"}) 
          } else { 
            if(!req.body.password){ 
              res.json({success: false, message: "Password was not given"}) 
            }else{ 
              passport.authenticate('local', function (err: any, user: any, info: any) { 
                 if(err){ 
                   res.json({success: false, message: err}) 
                 } else{ 
                  if (! user) { 
                    res.json({success: false, message: 'username or password incorrect' }) 
                  } else{ 
                    req.login(user, function(err: any){ 
                      if(err){ 
                        res.json({success: false, message: err}) 
                      }
                    const soundToken = createSecretToken(user);
                      console.log(`${soundToken} created`)
                     res.cookie("soundToken", soundToken, {
                      // withCredentials: true,httpOnly:false
                      withCredentials: true,
                      sameSite:"none",
                        httpOnly:true,
                        secure:true
                       })
                         res.json({success:true, message:"Login successful!", user:user }); 
                      
                    }) 
                  } 
                 } 
              })(req, res); 
            } 
          } 
            
    
           
    }catch (error){
        console.log(error)
        
    }
   
}


//Create forgot password token 
export const ForgotPassword = async (req:any, res:any ) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({email});
    if (!user || user.length === 0) {
      res.json({
        success: false,
        message: "Email are not registered!",
      });

    } else {
   const token = forgotPasswordToken(user._id)
    const filter = {email: email, }
      const update = {token:token}
       const doc = await User.findOneAndUpdate(filter, update, 
        {new:true, upsert:true,  includeResultMetadata: true})
        doc.save
      
       await contactEmail.sendMail({
        from: '"SoundPlanet 👻" adeyemiemma45@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "Forgot Password Link", // Subject line
        text: "Hello world?", // plain text body
        html: `Hello ${user.firstname}, We have received a request to reset your password. Please reset your password using the link below.",
          ${process.env.FRONTEND_URL}/resetpassword/${token},
          Reset Password`, // html body
      });
     
      res.json({success:true, message:"A password reset link has been sent to your email.", token:token }); 
    }
  }catch (error){
      console.log(error)
      
  }
 
}

// export const UpdatePassword = async (req:any, res:any  ) => {
//   const {oldPassword, newPassword, username} = req.body
//   try {
     
//     User.findByUsername(username, (err: any, user: { changePassword: (arg0: any, arg1: any, arg2: (err: any) => void) => void; }) => {
//       if (err) {
//           res.send(err);
//       } else {
//           user.changePassword(oldPassword, 
//           newPassword, function (err: any) {
//               if (err) {
//                   res.send(err);
//               } else {
//                   res.send('successfully change password')
//               }
//           });
//       }
//   });
         
//   }catch (error){
//       console.log(error)
      
//   }
 
// }

//Reset and change password
export const ResetPassword = async (req:any, res:any  ) => {
  const {token, password} = req.body
  console.log(token, password)
  try {
     if (token){
      jwt.verify(token, process.env.FORGOT_PASSWORD!, async  (err: any, data: any) =>{
        if(err){
          return res.json({success:false,  message:`Incorrect token or expired!`})
      }
      const getUser = await User.findOne({token:token})
      const username = getUser.username
      User.findByUsername(username, (err: any, user: { setPassword: (arg0: any, arg1: (err: any) => void) => void; save: () => void; }) => {
        if (err) {
            res.send(err);
        } else {
            user.setPassword(password, 
             function (err: any) {
                if (err) {
                    res.json({success:false, message:err});
                } else {
                   user.save()
                   User.findOneAndDelete({token:token})
                    res.json({success:true, message:"Password reset successfull"})
                }
            });
        }
    });
        
      })
     }else{
       return res.json({success:false, message:"Authentication Error"})
     }
    
         
  }catch (error){
      console.log(error)
      
  }
 
}

//get authorised User
export const  getAuthUser = async (req:any,  res:any) => {
  if (!req.user){
   return res.json({ success: false, message:`No User Found`})
  }
   res.json({ success: true, message:`Welcome ${req.user.firstname}`, user: req.user })

  }
  
  //Logout
export const Logout = async (req:any, res:any   ) => {
    if (req.user) {
         req.logout(function() {
             res.json({success:true, message: 'logging out' })
           });
    
    } else {
        res.json({success:false, message: 'no user to log out' })
    }
  
        
    
}

// Google OAuth route
export const  googleAuth = async (req:any, res:any) => {
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
}

// Google OAuth callback route
export const  googleAuthCallback = async (req:any, res:any) => {
  passport.authenticate('google', { failureRedirect: '/' }),
  (req:any, res:any) => {
    // Redirect to a secure route after successful login
    res.redirect('/getgoogleuser');
  }
}

export const  getGoogleUser = async (req:any, res:any) => {
  if (!req.isAuthenticated()) {
    return res.json({ success: false, message:`No User Found`})
  }
  // Send user profile data
  res.json({ success: true, message:`Welcome ${req.user.firstname}`, user: req.user })
}







