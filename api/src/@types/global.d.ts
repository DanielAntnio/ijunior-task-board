import { Secret } from "jsonwebtoken";
import { User } from "../../generated/prisma/client";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DATABASE_URL: string;
      JWT_SECRET: Secret;
      JWT_EXPIRES_IN: SignOptions["expiresIn"];
      JWT_REFRESH_SECRET: Secret;
      JWT_REFRESH_EXPIRES_IN: SignOptions["expiresIn"];
      NODE_ENV: "development" | "production" | "test";
      CLIENT_URL: string;
    }
  }
  namespace Express {
    interface Request {
      user?: Pick<User, "id" | "email">;
    }
  }
}

export {};
