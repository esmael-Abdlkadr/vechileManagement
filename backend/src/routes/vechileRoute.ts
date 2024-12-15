import express from "express";
import * as vechileController from "../controller/vechile";
import validate from "../middleware/validateMiddleware";
import { vehicleValidationSchema } from "../validation/validationSchema";
import { protect } from "../controller/userController";

const router = express.Router();
router.use(protect);
router.post(
  "/",
  validate(vehicleValidationSchema.create),
  vechileController.addVechile
);
router.get("/", vechileController.getAllVechile);
router.get("/:id", vechileController.getVechile);
router.patch("/:id", vechileController.updateVechile);
router.post("/delete/:id", vechileController.deleteVechile);

export default router;
