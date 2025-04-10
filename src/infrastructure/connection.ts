import mongoose from 'mongoose';
import { Config } from '../config';
import logger from '../config/logger';

export const connection = async () => {
    try {
        const connection = await mongoose.connect(Config.MONGO_URI as string);
        logger.info('Database Connected:', connection.connection.host);
    } catch (error) {
        logger.error('Databse Error Order Service', error);
        process.exit(1);
    }
};
