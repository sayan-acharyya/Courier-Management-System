import express from "express";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import {
  getDeliveryPerformance,
  getParcelGrowth,
  getRevenueAnalytics,
  getTopCities,
  getAnalyticsSummary,
} from "../controllers/analyticsController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Analytics and reporting endpoints
 */

/**
 * @swagger
 * /api/analytics/revenue:
 *   get:
 *     summary: Get monthly revenue analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly revenue analytics retrieved successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden. Admin access required.
 *       500:
 *         description: Internal server error.
 */
router.get("/revenue", protect, adminOnly, getRevenueAnalytics);

/**
 * @swagger
 * /api/analytics/parcel-growth:
 *   get:
 *     summary: Get monthly parcel growth analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly parcel growth analytics retrieved successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden. Admin access required.
 *       500:
 *         description: Internal server error.
 */
router.get("/parcel-growth", protect, adminOnly, getParcelGrowth);

/**
 * @swagger
 * /api/analytics/top-cities:
 *   get:
 *     summary: Get top destination cities by parcel count
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 8
 *           maximum: 20
 *         description: Number of top cities to return.
 *     responses:
 *       200:
 *         description: Top cities retrieved successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden. Admin access required.
 *       500:
 *         description: Internal server error.
 */
router.get("/top-cities", protect, adminOnly, getTopCities);

/**
 * @swagger
 * /api/analytics/delivery-performance:
 *   get:
 *     summary: Get delivery performance analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Delivery performance analytics retrieved successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden. Admin access required.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/delivery-performance",
  protect,
  adminOnly,
  getDeliveryPerformance
);

/**
 * @swagger
 * /api/analytics/summary:
 *   get:
 *     summary: Get overall analytics summary
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Analytics summary retrieved successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden. Admin access required.
 *       500:
 *         description: Internal server error.
 */
router.get("/summary", protect, adminOnly, getAnalyticsSummary);

export default router;