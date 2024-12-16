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

/**
 * @swagger
 * tags:
 *   name: Vehicle
 *   description: Vehicle management operations
 */

/**
 * @swagger
 * /api/vehicle:
 *   post:
 *     summary: Add a new vehicle
 *     tags: [Vehicle]
 *     security:
 *       - bearerAuth: []  # Requires authentication via JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *               licensePlate:
 *                 type: string
 *               model:
 *                 type: string
 *               make:
 *                 type: string
 *               year:
 *                 type: integer
 *               mileage:
 *                 type: number
 *                 format: float
 *               fuelType:
 *                 type: string
 *               vehicleModel:
 *                 type: string
 *             required:
 *               - name
 *               - status
 *               - licensePlate
 *               - model
 *               - make
 *               - year
 *               - mileage
 *               - fuelType
 *               - vehicleModel
 *     responses:
 *       201:
 *         description: Vehicle added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 vehicle:
 *                   $ref: '#/components/schemas/Vehicle'
 *       400:
 *         description: Validation error or vehicle already exists
 */

/**
 * @swagger
 * /api/vehicle:
 *   get:
 *     summary: Get all vehicles
 *     tags: [Vehicle]
 *     security:
 *       - bearerAuth: []  # Requires authentication via JWT
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortField
 *         schema:
 *           type: string
 *           default: "createdAt"
 *       - in: query
 *         name: sortDirection
 *         schema:
 *           type: string
 *           default: "asc"
 *     responses:
 *       200:
 *         description: List of vehicles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 vehicles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Vehicle'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 pages:
 *                   type: integer
 */

/**
 * @swagger
 * /api/vehicle/{id}:
 *   get:
 *     summary: Get a vehicle by ID
 *     tags: [Vehicle]
 *     security:
 *       - bearerAuth: []  # Requires authentication via JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehicle found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 vehicle:
 *                   $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Vehicle not found
 */

/**
 * @swagger
 * /api/vehicle/{id}:
 *   patch:
 *     summary: Update a vehicle by ID
 *     tags: [Vehicle]
 *     security:
 *       - bearerAuth: []  # Requires authentication via JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               licensePlate:
 *                 type: string
 *               model:
 *                 type: string
 *               make:
 *                 type: string
 *               year:
 *                 type: integer
 *               mileage:
 *                 type: number
 *                 format: float
 *               fuelType:
 *                 type: string
 *               vehicleModel:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 vehicle:
 *                   $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Vehicle not found
 */

/**
 * @swagger
 * /api/vehicle/delete/{id}:
 *   post:
 *     summary: Delete a vehicle by ID
 *     tags: [Vehicle]
 *     security:
 *       - bearerAuth: []  # Requires authentication via JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Vehicle deleted successfully
 *       404:
 *         description: Vehicle not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         status:
 *           type: string
 *         licensePlate:
 *           type: string
 *         model:
 *           type: string
 *         make:
 *           type: string
 *         year:
 *           type: integer
 *         mileage:
 *           type: number
 *           format: float
 *         fuelType:
 *           type: string
 *         vehicleModel:
 *           type: string
 *         lastUpdated:
 *           type: string
 *           format: date-time
 *         isDeleted:
 *           type: boolean
 */
