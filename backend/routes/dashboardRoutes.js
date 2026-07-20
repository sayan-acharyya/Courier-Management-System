import express from "express";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import { getDashboardStats } from "../controllers/dashboardController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard analytics and statistics endpoints
 */

/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalParcels:
 *                   type: integer
 *                   example: 150
 *                 deliveredParcels:
 *                   type: integer
 *                   example: 120
 *                 inTransitParcels:
 *                   type: integer
 *                   example: 20
 *                 pendingParcels:
 *                   type: integer
 *                   example: 10
 *                 totalRevenue:
 *                   type: number
 *                   example: 50000
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       403:
 *         description: Forbidden. Admin access required.
 *       500:
 *         description: Internal server error.
 */
router.get("/stats", protect, adminOnly, getDashboardStats);

export default router;