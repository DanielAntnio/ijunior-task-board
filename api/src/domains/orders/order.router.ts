import { Router } from "express";
import { OrderController } from "./order.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const orderRoutes = Router();
const controller = new OrderController();

orderRoutes.use(authMiddleware);

orderRoutes.head("/:id", controller.idExist);

orderRoutes.get("/", controller.list);
orderRoutes.get("/:id", controller.getById);

orderRoutes.post("/", controller.create);

orderRoutes.put("/:id", controller.update);

orderRoutes.delete("/:id", controller.delete);

export { orderRoutes };
