import app from "./app";
import { config } from './common/config';
import logger from './common/logger';

const port = config.port || 3001;

const server = app.listen(port, () => {
    logger.info(`Server is listening on ${port}`)
});

export default server;