import express from "express";
import * as authController from "../controller/userController";
import validate from "../middleware/validateMiddleware";
import * as validationSchema from "../validation/validationSchema";
const router = express.Router();
router.post(
  "/signup",
  validate(validationSchema.signupSchema),
  authController.signup
);
router.post(
  "/login",
  validate(validationSchema.loginSchema),
  authController.login
);
export default router;
