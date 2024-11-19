

import {User} from "../../models/User"

import passport from 'passport'

import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from "passport-facebook"


// use static serialize and deserialize of model for passport session support


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT,
  userProfileURL: "https:www.googleapis.com/oauth2/v3/userinfo",
  callbackURL: "http://localhost:3000/auth/google/soundplanet",


},
async function(accessToken, refreshToken, profile,  done) {
  //Check the DB to find a User with the profile.id
  try{
    let user = await User.findOne({userId: profile.id})
    if(!user) {
        user = await User.create({
            userid: profile.id,
            firstname: profile.displayName,
            email: profile.emails[0].value,
            username:profile.emails[0].value,
            token:accessToken
        });
    }
  
    console.log(accessToken, refreshToken)
    return done(null, user)
}catch (err){
  console.log(err)
}
}

));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP,
  callbackURL: "http://localhost:3000/oauth2/redirect/facebook",
  state: true

},

async function(accessToken, refreshToken, profile, done) {
  //Check the DB to find a User with the profile.id
  try{
    let user = await User.findOne({userId: profile.id})
    if(!user) {
        user = await User.create({
            userid: profile.id,
            firstname: profile.displayName,
            token:accessToken
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