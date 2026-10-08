import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const protect = async (req, res, next) => {
    let token;

    // 1. Check Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    // 2. If no header token, check HTTP-only cookie
    if (!token && req.cookies?.token) {
        token = req.cookies.token;
    }

    // 3. No token found
    if (!token) {
        return res.status(401).json({
            message: "Not authorized, no token",
        });
    }

    try {
        // 4. Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // 5. Find user
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({
                message: "Not authorized, user not found",
            });
        }

        // 6. Continue
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Not authorized, token failed",
        });
    }
};

export const adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied. Admins only.",
        });
    }

    next();
};