import { body } from "express-validator";

const loginValidation = [
  body("username").notEmpty().withMessage("Username is required").trim(),

  body("password").notEmpty().withMessage("Password is required"),
];

export default loginValidation;
