import winston from 'winston';
import { Config } from '.';

const consoleFormat = winston.format.combine(
    winston.format.colorize({ all: true }), // Apply colorization to everything (level and message)
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
        const metaString = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
        return `[${timestamp}] ${level}: ${message} ${metaString}`;
    }),
);

const fileFormat = winston.format.combine(winston.format.timestamp(), winston.format.json());

const logger = winston.createLogger({
    level: 'info',
    defaultMeta: { service: 'Order-Service' },

    transports: [
        new winston.transports.File({
            dirname: 'logs',
            filename: 'app.log',
            level: 'info',
            format: fileFormat,
            silent: Config.NODE_ENV === 'test',
        }),
        new winston.transports.File({
            dirname: 'logs',
            filename: 'error.log',
            level: 'error',
            format: fileFormat,
            silent: Config.NODE_ENV === 'test',
        }),
        new winston.transports.Console({
            level: 'info',
            format: consoleFormat,
            silent: Config.NODE_ENV === 'test',
        }),
    ],
});

export default logger;
