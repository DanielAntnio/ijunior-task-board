import { Router } from "express";
import { ClientController } from "./clients.controller";

const clientRoutes = Router();
const controller = new ClientController();

clientRoutes.head("/:id", controller.idExist);

clientRoutes.get("/", controller.list);
clientRoutes.get("/:id", controller.getById);

clientRoutes.post("/", controller.create);

clientRoutes.put("/:id", controller.update);

clientRoutes.delete("/:id", controller.delete);


export { clientRoutes };
