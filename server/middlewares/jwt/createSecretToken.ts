import 'dotenv/config'
import jwt from 'jsonwebtoken'

// Create authentication token

export const createSecretToken = (data:any) => {
  return jwt.sign({data}, process.env.TOKEN_KEY!,  {expiresIn: Math.floor(Date.now() / 1000) + (60 * 96* 60),})
  }
  
// create forgot password token
export const forgotPasswordToken = (id:any) => {
  return jwt.sign({id}, process.env.FORGOT_PASSWORD!,  {
    expiresIn:'15m',
  })
  }

 

