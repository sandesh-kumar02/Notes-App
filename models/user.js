import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';
// schema define

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
    },
     githubId: {
      type : String
     },
    profilePicture: {
      type: String,
      default: "/images/profile.png",
    },
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

export default User;