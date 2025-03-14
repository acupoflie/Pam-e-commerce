import pino, { stdTimeFunctions } from "pino";
import { pinoHttp } from "pino-http";

export const logger = pino({
  name: "catalog_service",
  level: "info",
  base: {
    serviceName: "catalog_service",
  },
  msgPrefix: "[Catalog Service]: ",
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
