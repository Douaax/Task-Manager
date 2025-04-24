const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(), // show logs in the terminal
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }) // save errors to file
    ]
});

module.exports = logger;
