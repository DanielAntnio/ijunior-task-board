import { Router } from "express";
import { ServiceOrderController } from "./service-order.controller";

const serviceOrderRoutes = Router();
const controller = new ServiceOrderController();

serviceOrderRoutes.head("/:id", controller.idExist);

serviceOrderRoutes.get("/", controller.list);
serviceOrderRoutes.get("/:id", controller.getById);

serviceOrderRoutes.post("/", controller.create);

serviceOrderRoutes.put("/:id", controller.update);

serviceOrderRoutes.delete("/:id", controller.delete);

export { serviceOrderRoutes };
