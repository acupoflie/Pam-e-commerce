import { NextFunction, Request, Response } from "express";
import {
  APIError,
  NotFoundError,
  Unauthorized,
  ValidationError,
} from "./errors";
import { logger } from "../logger/logger";

export const GlobalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let reportError = true;
  let data = error.message;

  [NotFoundError, APIError, ValidationError, Unauthorized].forEach(
    (errorType) => {
      if (error instanceof errorType) {
        reportError = false;
        statusCode = error.status;
        data = error.message;
      }
    }
  );

  if (reportError) {
    logger.error(error);
  } else {
    logger.warn(error);
  }

  res.status(statusCode).json(data);
};
