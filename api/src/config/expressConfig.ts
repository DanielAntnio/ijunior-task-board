import express from "express";
import cookieParser from "cookie-parser";
import { ErrorHandler } from "../middlewares/error";
import { PrismaErrorHandler } from "../middlewares/prisma-error";
import { ZodErrorHandler } from "../middlewares/zod-erro";
import { clientRoutes } from "../domains/clients/clients.router";
import { serviceOrderRoutes } from "../domains/service-orders/service-order.router";
import { authRoutes } from "../domains/auth/auth.router";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/clients", clientRoutes);
app.use("/service_orders", serviceOrderRoutes);

app.use(ZodErrorHandler);
app.use(PrismaErrorHandler);
app.use(ErrorHandler);

export { app };
