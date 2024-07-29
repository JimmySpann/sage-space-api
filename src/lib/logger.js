const red = '\x1b[31m';
const cyan = '\x1b[36m';

const reset = '\x1b[0m';


const logger = {
    info: (message) => console.info(cyan + 'info:' + reset, message),
    error: (message) => console.error(red + 'error:', message, reset),
    dev: (...args) => {
        if (process.env.NODE_ENV === 'dev') console.log(...args)
    }
};

export default logger;