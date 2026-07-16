import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

//genearate jwt 
const genearateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

export const login = async (req, res, next) => {
    try {
        const { error, value } = loginSchema.validate(req.body);
        
    } catch (error) {

    }
}