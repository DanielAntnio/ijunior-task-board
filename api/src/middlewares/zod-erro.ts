import type { Request, Response } from "express";
import { NextFunction } from "express";
import z from "zod";
import { BadRequestError } from "../utils/api-erros";

export function ZodErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof z.ZodError) {
    throw new BadRequestError(
      error.issues
        .map((issue) => `${issue.message} (${issue.path}).`)
        .join("\n"),
    );
  }

  next(error);
}
