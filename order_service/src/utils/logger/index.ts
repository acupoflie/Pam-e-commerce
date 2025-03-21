import pino, { stdTimeFunctions } from "pino";
import { pinoHttp } from "pino-http";

export const logger = pino({
  name: "order_service",
  level: "info",
  base: {
    serviceName: "order_service",
  },
  msgPrefix: "[Order Service]: ",
  timestamp: stdTimeFunctions.isoTime,
  transport: {
    target: "pino-pretty",
    level: "error",
  },
});

export const httpLogger = pinoHttp({
  logger,
  level: "error",
});
