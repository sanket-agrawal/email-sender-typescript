import mongoose from "mongoose";
import { config } from "./config";
import logger from "./logger";

export const connectDB = async () => {
    try {
        await mongoose.connect(config.mongo.connectionString);
        logger.info('MongoDB connected Succesfully');
    } catch (error) {
        logger.error('Error connecting MongoDB',error);
        process.exit(1);
    }
}