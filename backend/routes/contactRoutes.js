import express from "express";
import {
  createContact,
  getContacts,
  getContactById,
  deleteContact,
} from "../controllers/contactController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact Us API
 */

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Send a contact message
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sayan Acharyya
 *               email:
 *                 type: string
 *                 example: sayan@gmail.com
 *               phone:
 *                 type: string
 *                 example: "+91 9876543210"
 *               message:
 *                 type: string
 *                 example: I want to know more about Rydex Swift services.
 *     responses:
 *       201:
 *         description: Message sent successfully
 *       400:
 *         description: Validation error
 */
router.post("/", createContact);

/**
 * @swagger
 * /api/contact:
 *   get:
 *     summary: Get all contact messages
 *     tags: [Contact]
 *     responses:
 *       200:
 *         description: List of all contact messages
 */
router.get("/", getContacts);

/**
 * @swagger
 * /api/contact/{id}:
 *   get:
 *     summary: Get a contact message by ID
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact message found
 *       404:
 *         description: Contact message not found
 */
router.get("/:id", getContactById);

/**
 * @swagger
 * /api/contact/{id}:
 *   delete:
 *     summary: Delete a contact message
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact message deleted successfully
 *       404:
 *         description: Contact message not found
 */
router.delete("/:id", deleteContact);

export default router;