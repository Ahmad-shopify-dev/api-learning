import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configurations/env.js";
import User from "../models/user.model.js";


const authroize = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                return res.status(401).json({
                    message: "User not authorized"
                })
            }

            const verifyToken = jwt.verify(token, JWT_SECRET);
            const user = await User.findById(verifyToken.userId);
            if (!user) {
                return res.status(401).json({
                    message: "User not authorized"
                })
            }

            // KEEP THE USER FOR THE REST OF THE METHODS WHICH CALLING THIS AS MIDDLEWARE TO COMPARE THE USER
            req.user = user;
            next();
        } else {
            return res.status(401).json({
                message: "User not authorized"
            })
        }
    } catch (error) {
        res.status(401).json({
            message: "User not authorized",
            error: error.message
        })
        next(error);
    }
}

export default authroize;
