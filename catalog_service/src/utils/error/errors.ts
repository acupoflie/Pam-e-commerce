import { STATUS_CODES } from "./status-codes";

class BaseError extends Error {
  public readonly name: string;
  public readonly status: number;
  public readonly message: string;

  constructor(name: string, status: number, message: string) {
    super(message);
    this.name = name;
    this.status = status;
    this.message = message;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class APIError extends BaseError {
  constructor(description = "api error") {
    super("API Error", STATUS_CODES.BAD_REQUEST, description);
  }
}

export class NotFoundError extends BaseError {
  constructor(description = "Not found") {
    super("Not found Error", STATUS_CODES.NOT_FOUND, description);
  }
}

export class Unauthorized extends BaseError {
  constructor(description = "You are not authorized") {
    super("Authorization error", STATUS_CODES.UN_AUTHORIZED, description);
  }
}

export class ValidationError extends BaseError {
  constructor(description = "Something wrong with validations") {
    super("Validation Error", STATUS_CODES.BAD_REQUEST, description);
  }
}
