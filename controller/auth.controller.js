import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../configurations/env.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }

        const saltGrain = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltGrain);
        const newUser = await User.create([{ name, email, password: hashedPassword }], { session });
        const accessToken = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                accessToken,
                user: newUser[0]
            }
        });

        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            const error = "User not found with this email";
            error.statusCode = 404;
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const error = "Passowrd is not corrent";
            error.statusCode = 401;
            throw error
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.status(200).json({
            success: true,
            message: "User sign in successfully",
            data: {
                token,
                user
            }
        })

    } catch (error) {
        next(error)
    }
}

export const signOut = async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "User logout successfully.",
    });
}



