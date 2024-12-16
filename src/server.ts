import app from "./app";
import { config } from './common/config';
import logger from './common/logger';
import { connectDB } from "./common/mongo";

const port = config.port || 3001;

const startServer = async () => {
    try {
        await connectDB();

        const server = app.listen(port, () => {
            logger.info(`Server is listening on ${port}`)
        });

        process.on('SIGINT', () => {
            logger.info('Shutting down server...');
            server.close(() => {
              logger.info('Server shut down gracefully.');
              process.exit(0);
            });
          });
        
    } catch (error) {
        logger.error('Error Starting the server',error);
        process.exit(1);
    }
}

startServer();