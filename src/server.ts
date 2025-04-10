import { Config } from './config';
import app from './app';
import logger from './config/logger';
import { connection } from './infrastructure/connection';

const startServer = async () => {
    try {
        await connection();
        app.listen(Config.PORT, () => {
            logger.info(`Server is running at http://localhost:${Config.PORT}`);
        });
    } catch (error) {
        if (error instanceof Error) {
            logger.error(error.message);
            setTimeout(() => process.exit(1), 1000);
        }
    }
};

void startServer();
