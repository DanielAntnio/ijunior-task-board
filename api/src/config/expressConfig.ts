import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ErrorHandler } from "../middlewares/error";
import { PrismaErrorHandler } from "../middlewares/prisma-error";
import { ZodErrorHandler } from "../middlewares/zod-erro";
import { clientRoutes } from "../domains/clients/clients.router";
import { orderRoutes } from "../domains/orders/order.router";
import { authRoutes } from "../domains/auth/auth.router";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/auth", authRoutes);
app.use("/clients", clientRoutes);
app.use("/orders", orderRoutes);

app.use(ZodErrorHandler);
app.use(PrismaErrorHandler);
app.use(ErrorHandler);

export { app };
