import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import path from "path";
import methodOverride from "method-override";
import { fileURLToPath } from "url";
import passport from "passport";
import "./config/passport.js";
const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      path: "/",
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

import connectDB from "./config/db.js";

connectDB();
app.use("/", authRoutes);
app.use("/", noteRoutes);
app.listen(process.env.PORT || 3000, () => {
  console.log("server is start on port no. 3000");
});
