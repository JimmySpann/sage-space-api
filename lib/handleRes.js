import logger from './logger.js';

export const handleResError = (res, error, message, status = 500) => {
    logger.error(error);
    return res.status(status).json({ message });
};