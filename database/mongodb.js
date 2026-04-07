import mongoose from "mongoose";
import { NODE_ENV, DB_URI } from "../configurations/env.js";

if (!DB_URI) {
    throw new Error("Please define MONGO_DB_URI in your environment path");
}

const connnectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Connected Successfully to DB from ${NODE_ENV}`)
    } catch (error) {
        console.log("Something wrong while connecting to DB: ", error);
        process.exit(1)
    }
}


export default connnectToDatabase;

