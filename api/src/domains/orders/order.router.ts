import { Router } from "express";
import { OrderController } from "./order.controller";

const orderRoutes = Router();
const controller = new OrderController();

orderRoutes.head("/:id", controller.idExist);

orderRoutes.get("/", controller.list);
orderRoutes.get("/:id", controller.getById);

orderRoutes.post("/", controller.create);

orderRoutes.put("/:id", controller.update);

orderRoutes.delete("/:id", controller.delete);

export { orderRoutes };
