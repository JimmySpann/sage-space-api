import { messages } from '../config/commonMessages.js';
import logger from './logger.js';

/**
 * Update http response with an error status code and proper payload 
 * @param {object} params
 * @param {object} params.res - Express response
 * @param {object | string} params.error - The error. Could be object or string
 * @param {string} [params.userMessage=] - (Optional) Will send generic_error message if undefined
 * @param {number} [params.statusCode=500] - (Optional) Send message to server by logger
 * @returns {object} Updated res with status and json error message
 */
export const getResponseError = ({ 
    res, 
    error, 
    userMessage = messages.generic_error.to_user, 
    statusCode = 500 
}) => {
    const { customThrow, message } = error
    const mongooseValidationError = message?.includes('validation failed');

    if (customThrow) {
        statusCode = error.statusCode;
        userMessage = error.userMessage;
        error = error.error;
    } else if (mongooseValidationError) {
        error = message;
        statusCode = 400;
    }
    
    logger.error(error);
    return res.status(statusCode).json({ message: userMessage });
};

/**
 * Update http response with a successful status code and proper payload. Send optional message to server
 * @param {object} params
 * @param {object} params.res - Express response
 * @param {object | string} params.payload - Payload sent to user. Could be object or string
 * @param {string} [params.serverMessage] - (Optional) Send message to server by logger
 * @returns Updated res with status and json payload
 */
export const getResponseSuccess = ({ res, payload, serverMessage }) => {
    const isPayloadString = (typeof payload === 'string')

    if (serverMessage) logger.info(serverMessage);

    return isPayloadString 
            ? res.status(200).json({ message: payload }) 
            : res.status(200).json(payload);
};