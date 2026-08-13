import { Secret } from "jsonwebtoken";
import { User } from "../../generated/prisma/client";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DATABASE_URL: string;
      DATABASE_USER: string;
      DATABASE_PASSWORD: string;
      DATABASE_NAME: string;
      DATABASE_HOST: string;
      JWT_SECRET: Secret;
      JWT_EXPIRES_IN: SignOptions["expiresIn"];
      JWT_REFRESH_SECRET: Secret;
      JWT_REFRESH_EXPIRES_IN: SignOptions["expiresIn"];
      NODE_ENV: "development" | "production" | "test";
    }
  }
  namespace Express {
    interface Request {
      user?: Pick<User, "id" | "email">;
    }
  }
}

export {};
