export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400);
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class UnauthorizeddError extends ApiError {
  constructor(message: string) {
    super(message, 401);
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class NotfoundError extends ApiError {
  constructor(message: string) {
    super(message, 404);
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class ConflictError extends ApiError {
  constructor(message: string) {
    super(message, 409);
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string = "Erro desconhecido no servidor") {
    super(message, 500);
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
