import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";
import cookieParser from "cookie-parser";
import { swaggerSpec } from "./config/swagger.js";
import { globalLimiter } from "./middlewares/rateLimiter.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import parcelRoutes from "./routes/parcelRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

// Required if running behind Vite proxy or Nginx so rate-limiter reads correct IP
app.set("trust proxy", 1);

app.use(cookieParser());
app.use(helmet());
app.use(cors({
  origin: [
    "https://transcendent-eclair-ca10bc.netlify.app",
    "https://glittering-platypus-61148a.netlify.app",
  ],
  credentials: true,
}));
app.use(morgan("dev"));
app.use(compression());
app.use(express.json());

// Global rate limiter
app.use(globalLimiter);

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is healthy" });
});

app.use("/api/auth", authRoutes);
app.use("/api/parcels", parcelRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/contact", contactRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;