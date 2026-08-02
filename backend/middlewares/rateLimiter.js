import rateLimit from "express-rate-limit";

// Dynamic limits based on environment
const isDev = process.env.NODE_ENV === "development";

// Global API rate limiter
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDev ? 1000 : 100, // 1000 in dev, 100 in production
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => isDev, // Optional: Skip rate limiting completely during development
  message: {
    message: "Too many requests from this IP, please try again after 15 minutes",
  },
});

// Specific authentication rate limiter
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isDev ? 100 : 20, // 100 in dev, 20 in production
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many authentication attempts from this IP, please try again after 15 minutes",
  },
});