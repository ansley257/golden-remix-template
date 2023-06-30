// create a winston logger with a file transport
import winston from 'winston';
import os from 'os';

import { DatadogTransport } from '../utils/util.datadogTransport';

export const Logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: {
    service: process.env.SERVICE_NAME,
    env: process.env.NODE_ENV,
    version: process.env.VERSION,
    source: 'remix',
    hostname: os.hostname(),
    process: process.pid,
  },
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './logs/all-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    }),
    new DatadogTransport({
      ddApiKey: process.env.DD_API_KEY,
      level: 'info',
      handleExceptions: true,
      json: true,
      colorize: false,
    }),
  ],
  exitOnError: false,
});
