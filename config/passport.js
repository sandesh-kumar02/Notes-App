import passport from "passport";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import pkg from "passport-github2";
const { Strategy: GithubStrategy } = pkg;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_Client_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALL_BACK_URL,
    },
    async function (accessTokens, refreshToken, profile, cb) {
      try {
        const email = profile.emails[0].value;
        let existingUser = await User.findOne({ email });
        if (existingUser) {
          return cb(null, existingUser);
        } else {
          const newUser = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            profilePicture: profile.photos[0].value,
            googleId: profile.id,
          });
          let result = await newUser.save();
          console.log(result);
          return cb(null, newUser);
        }
      } catch (error) {
        return cb(error, null);
      }
    }
  )
);

// github auth

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async function (accessTokens, refreshToken, profile, cb) {
      try {
        const email = profile.emails?.[0]?.value || "";
        const photo = profile.photos?.[0]?.value || "/images/profile.png";

        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
          let user = await User.create({
            username: profile.username,
            githubId: profile.id,
            email: email,
            profilePicture: photo,
          });
          cb(null, user);
        }
      } catch (error) {
        cb(error, null);
      }
    }
  )
);
passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
