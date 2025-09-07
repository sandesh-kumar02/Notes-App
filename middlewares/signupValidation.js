import { body } from "express-validator";

const signupValidation = [
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .isLength({ min: 3 })
    .withMessage("username at least 3 character")
    .isLength({ max: 8 })
    .withMessage("username maximum at least 8 character")
    .matches(/^[a-zA-Z ]+$/)
    .withMessage("Username can only contain letters and spaces")
    .trim(),
  body("password")
    .notEmpty()
    .withMessage("password id required")
    .isLength({ min: 6 })
    .withMessage("password at least 6 character"),
  body("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Enter a valid email")
    .notEmpty()
    .withMessage("emil is required")
    .trim(),
];

export default signupValidation;
