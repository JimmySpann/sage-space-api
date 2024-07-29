import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from './logger.js';

dotenv.config();

const connectionString = process.env.MONGODB_URI;
const configOptions = { };

export const startMongoDatabase = () => {
    mongoose.connect(connectionString, configOptions)
        .then(() => logger.info('MongoDB successfully connected...'))
        .catch(err => logger.error(`MongoDB connection error: ${err}`));
};