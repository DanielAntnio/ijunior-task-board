import type { Request, Response } from "express";
import { NextFunction } from "express";
import { ApiError } from "../utils/api-erros";

export function ErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (
    error.name === "SyntaxError" &&
    error.message === "Unexpected end of JSON input"
  )
    return res.status(400).json({ error: "Deve fornecer body" });

  return res
    .status(error instanceof ApiError ? error.statusCode : 500)
    .json({ error: error.message });
}
