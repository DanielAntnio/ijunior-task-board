import jwt, { SignOptions } from "jsonwebtoken";

interface TokenPayload {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

export function generateToken(
  payload: Pick<TokenPayload, "id" | "email">,
): string {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

export function generateRefreshToken(
  payload: Pick<TokenPayload, "id">,
): string {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
}

export function verifyToken(token: string): TokenPayload {
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
  return decoded;
}

export function verifyRefreshyToken(
  token: string,
): Omit<TokenPayload, "email"> {
  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET) as Omit<
    TokenPayload,
    "email"
  >;
  return decoded;
}
