

import {User} from "../../models/User"

import passport from 'passport'

import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from "passport-facebook"


// use static serialize and deserialize of model for passport session support


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT,
  callbackURL: "http://localhost:3000/auth/google/callback",


},
async (accessToken, refreshToken, profile,  done) =>{
  //Check the DB to find a User with the profile.id
  try{
    let user = await User.findOne({googleId: profile.id})
    if(!user) {
        user = await User.create({
            userid: profile.id,
            firstname: profile.displayName,
            email: profile.emails[0].value,
          
        });
    }
  
    return done(null, user)
}catch (err){
  console.log(err)
}
}

));



passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

passport.use(User.createStrategy());






export default passport;