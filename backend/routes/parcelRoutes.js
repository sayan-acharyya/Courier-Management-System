import express from "express";
import { createParcel } from "../controllers/parcelController.js";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Parcels
 *   description: Endpoints for managing parcels
 */

/**
 * @swagger
 * /api/parcels:
 *   post:
 *     summary: Create a new parcel (Admin only)
 *     tags: [Parcels]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - senderName
 *               - senderPhone
 *               - senderAddress
 *               - receiverName
 *               - receiverPhone
 *               - receiverAddress
 *               - shipmentType
 *               - originCity
 *               - destinationCity
 *               - deliveryType
 *               - parcelCategory
 *               - weight
 *             properties:
 *               senderName:
 *                 type: string
 *               senderPhone:
 *                 type: string
 *               senderAddress:
 *                 type: string
 *               receiverName:
 *                 type: string
 *               receiverPhone:
 *                 type: string
 *               receiverAddress:
 *                 type: string
 *               shipmentType:
 *                 type: string
 *                 enum:
 *                   - national
 *                   - international
 *               originCity:
 *                 type: string
 *               destinationCity:
 *                 type: string
 *               deliveryType:
 *                 type: string
 *                 enum:
 *                   - standard
 *                   - overnight
 *                   - sameDay
 *               parcelCategory:
 *                 type: string
 *                 enum:
 *                   - document
 *                   - electronics
 *                   - fragile
 *                   - clothing
 *                   - food
 *                   - medicine
 *                   - cosmetics
 *                   - books
 *                   - small_package
 *                   - large_package
 *               weight:
 *                 type: number
 *                 description: Weight of the parcel in kilograms.
 *                 example: 3.5
 *           example:
 *             senderName: Rahul Sharma
 *             senderPhone: "+91-9876543210"
 *             senderAddress: "MG Road, Bengaluru, Karnataka"
 *             receiverName: Priya Singh
 *             receiverPhone: "+91-9123456789"
 *             receiverAddress: "Sector 62, Noida, Uttar Pradesh"
 *             shipmentType: national
 *             originCity: Bengaluru
 *             destinationCity: Noida
 *             deliveryType: overnight
 *             parcelCategory: electronics
 *             weight: 3.5
 *     responses:
 *       201:
 *         description: Parcel created successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized access.
 *       403:
 *         description: Admin access required.
 */
router.post("/", protect, adminOnly, createParcel);

export default router;

//3:19:20