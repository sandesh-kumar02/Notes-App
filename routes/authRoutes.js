import express from "express";
import passport from "passport";
import Note from "../models/notes.js";
import User from "../models/user.js";
import { validationResult } from "express-validator";
import signupValidation from "../middlewares/signupValidation.js";
import loginValidation from "../middlewares/loginValidation.js";
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login", { errors: {}, data: {} });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

router.get("/dashboard", isLoggedIn, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.render("dashboard", { user: req.user, notes });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/dashboard",
  })
);

router.post("/signup", signupValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("login", {
        errors: errors.mapped(), // field-wise errors
        data: req.body, // jo user ne type kiya wo wapas fill karne ke liye
      });
    }

    const { username, password, email } = req.body;
    let newUser = await User.register({ username, email }, password);
    console.log(newUser);
    res.redirect("/login-user");
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});

router.get("/login-user", (req, res) => {
  res.render("user-login", {
    errors: {}, // koi errors nahi hai initially
    data: {}, // koi pre-filled input nahi hai initially
  });
});

router.post(
  "/login-user",
  loginValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("user-login", {
        errors: errors.mapped(),
        data: req.body,
      });
    }
    next();
  },
  passport.authenticate("local", {
    failureRedirect: "/login-user",
    successRedirect: "/dashboard",
  })
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.redirect("/login");
    });
  });
});

// github login

router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    successRedirect: "/dashboard",
  })
);
export default router;
