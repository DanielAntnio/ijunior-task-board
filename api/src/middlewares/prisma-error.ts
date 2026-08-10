import type { Request, Response } from "express";
import { NextFunction } from "express";
import {
  BadRequestError,
  ConflictError,
  InternalServerError,
  NotfoundError,
} from "../utils/api-erros";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/client";

export function PrismaErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        const index = (
          error.meta?.driverAdapterError as {
            cause: { constraint: { index: string } };
          }
        )?.cause?.constraint?.index;

        throw new ConflictError(
          `Já existe uma instância de ${error.meta?.modelName ?? "Objeto"} com esse(a) ${index || "campo único"}`,
        );
      case "P2003":
        throw new BadRequestError(
          "A chave estrangeira fornecida não corresponde a um modelo existente.",
        );
      case "P2025":
        throw new NotfoundError(
          `${error.meta?.modelName ?? "Objeto"} não encontrada`,
        );
      default:
        throw new InternalServerError();
    }
  }

  if (error instanceof PrismaClientValidationError)
    throw new BadRequestError(
      "Ocorreu um erro de validação, verifique se o body está correto.",
    );

  if (error instanceof PrismaClientInitializationError)
    throw new InternalServerError("Não foi possíel iniciar o servidor");

  if (
    error instanceof PrismaClientUnknownRequestError ||
    error instanceof PrismaClientRustPanicError
  )
    throw new InternalServerError();

  next(error);
}
