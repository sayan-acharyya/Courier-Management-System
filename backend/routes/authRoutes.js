 import express from "express";
import { addUser, login } from "../controllers/authController.js";
import { authLimiter } from "../middlewares/rateLimiter.js";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints for Admin authentication and management
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Admin Login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful login, returns JWT token and user info.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Invalid email or password.
 */
router.post("/login", authLimiter, login);

/**
 * @swagger
 * /api/auth/add-user:
 *   post:
 *     summary: Add New Admin
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: password123
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden. Admin access required.
 */
router.post("/add-user", protect, adminOnly, addUser);

export default router;  