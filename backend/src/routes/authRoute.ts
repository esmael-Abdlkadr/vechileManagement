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
router.use(authController.protect);
router.get("/me", authController.protect, authController.myInfo);
router.patch("/updateMe", authController.protect, authController.updateMe);
router.post("/changePassword", authController.ChangePassword);
export default router;
