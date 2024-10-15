import { Config } from './config';
import app from './app';

const startServer = () => {
    try {
        app.listen(Config.PORT, () => {
            // eslint-disable-next-line no-console
            console.log(`Server is running at http://localhost:${Config.PORT}`);
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        process.exit(1);
    }
};

startServer();
