import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token";
import { UnauthorizeddError } from "../utils/api-erros";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies?.token as string | undefined;

  if (!token) throw new UnauthorizeddError("Token não fornecido");

  try {
    const payload = verifyToken(token);
    req.user = { id: payload.id, email: payload.email };
    return next();
  } catch {
    throw new UnauthorizeddError("Token não fornecido");
  }
}
