import rateLimit from "express-rate-limiter";

//Global API rate limiter
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: "Too many requests from this IP, please try again after 15 minutes",
    }
})

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: "Too many authentication attemps from this IP, please try again after 15 minutes"
    }
})