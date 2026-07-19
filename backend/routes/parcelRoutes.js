import express from "express";
import { addCheckpoint, calculateCostCalculator, createParcel, getAllParcels, getParcelByTrackingId } from "../controllers/parcelController.js";
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

/**
 * @swagger
 * /api/parcels/track/{trackingId}:
 *   get:
 *     summary: Get parcel details by tracking ID
 *     tags: [Parcels]
 *     parameters:
 *       - in: path
 *         name: trackingId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique tracking ID of the parcel
 *         example: IND-TRK-px2p3y591
 *     responses:
 *       200:
 *         description: Parcel details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 trackingId:
 *                   type: string
 *                 senderName:
 *                   type: string
 *                 receiverName:
 *                   type: string
 *                 shipmentType:
 *                   type: string
 *                 originCity:
 *                   type: string
 *                 destinationCity:
 *                   type: string
 *                 deliveryType:
 *                   type: string
 *                 parcelCategory:
 *                   type: string
 *                 weight:
 *                   type: number
 *                 price:
 *                   type: number
 *                 status:
 *                   type: string
 *                 checkpoints:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       location:
 *                         type: string
 *                       status:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       updatedBy:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       404:
 *         description: Parcel not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/track/:trackingId", getParcelByTrackingId);

/**
 * @swagger
 * /api/parcels/{id}/checkpoint:
 *   post:
 *     summary: Add a new checkpoint to a parcel (Admin only)
 *     tags: [Parcels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ID of the parcel
 *         schema:
 *           type: string
 *           example: 687a7b0c2d5f7b0012345678
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - location
 *               - status
 *               - title
 *               - description
 *             properties:
 *               location:
 *                 type: string
 *                 example: Kolkata
 *               status:
 *                 type: string
 *                 enum:
 *                   - arrived
 *                   - departed
 *                   - in_transit
 *                   - out_for_delivery
 *                   - delivered
 *                   - delayed
 *               title:
 *                 type: string
 *                 example: Parcel arrived at Kolkata Hub
 *               description:
 *                 type: string
 *                 example: Parcel has reached the Kolkata sorting facility.
 *     responses:
 *       201:
 *         description: Checkpoint added successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized access.
 *       403:
 *         description: Admin access required.
 *       404:
 *         description: Parcel not found.
 *       500:
 *         description: Internal server error.
 */
router.post("/:id/checkpoint", protect, adminOnly, addCheckpoint);

/**
 * @swagger
 * /api/parcels:
 *   get:
 *     summary: Get all parcels with pagination, search, and status filter (Admin only)
 *     tags: [Parcels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of parcels per page.
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - arrived
 *             - in_transit
 *             - out_for_delivery
 *             - delivered
 *         description: Filter parcels by current status.
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search parcels by tracking ID.
 *         example: IND-TRK-px2p3y591
 *     responses:
 *       200:
 *         description: Parcels retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       trackingId:
 *                         type: string
 *                       senderName:
 *                         type: string
 *                       receiverName:
 *                         type: string
 *                       shipmentType:
 *                         type: string
 *                       originCity:
 *                         type: string
 *                       destinationCity:
 *                         type: string
 *                       deliveryType:
 *                         type: string
 *                       parcelCategory:
 *                         type: string
 *                       weight:
 *                         type: number
 *                       price:
 *                         type: number
 *                       checkpoints:
 *                         type: array
 *                         items:
 *                           type: object
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 total:
 *                   type: integer
 *                   example: 52
 *                 totalPages:
 *                   type: integer
 *                   example: 6
 *       401:
 *         description: Unauthorized access.
 *       403:
 *         description: Admin access required.
 *       500:
 *         description: Internal server error.
 */
router.get("/", protect, adminOnly, getAllParcels);

/**
 * @swagger
 * /api/parcels/calculate-cost:
 *   post:
 *     summary: Calculate parcel delivery cost
 *     tags: [Parcels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shipmentType
 *               - originCity
 *               - destinationCity
 *               - deliveryType
 *               - parcelCategory
 *               - weight
 *             properties:
 *               shipmentType:
 *                 type: string
 *                 enum:
 *                   - national
 *                   - international
 *                 example: national
 *               originCity:
 *                 type: string
 *                 example: Kolkata
 *               destinationCity:
 *                 type: string
 *                 example: Delhi
 *               deliveryType:
 *                 type: string
 *                 enum:
 *                   - standard
 *                   - overnight
 *                   - sameDay
 *                 example: overnight
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
 *                 example: electronics
 *               weight:
 *                 type: number
 *                 example: 2.5
 *                 description: Weight of the parcel in kilograms
 *           example:
 *             shipmentType: national
 *             originCity: Kolkata
 *             destinationCity: Delhi
 *             deliveryType: overnight
 *             parcelCategory: electronics
 *             weight: 2.5
 *     responses:
 *       200:
 *         description: Delivery cost calculated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 price:
 *                   type: number
 *                   example: 450
 *                 breakdown:
 *                   type: object
 *                   properties:
 *                     baseCharge:
 *                       type: number
 *                       example: 200
 *                     weightCharge:
 *                       type: number
 *                       example: 100
 *                     deliveryCharge:
 *                       type: number
 *                       example: 80
 *                     categoryCharge:
 *                       type: number
 *                       example: 70
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */
router.post("/calculate-cost", calculateCostCalculator);

export default router;

