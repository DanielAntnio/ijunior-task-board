import type { Request, Response } from "express";
import { BadRequestError } from "../../utils/api-erros";
import { ServiceOrderService } from "./service-order.service";
import {
  ServiceOrderCreateInput,
  ServiceOrderUpdateInput,
} from "./service-order.schema";

class ServiceOrderController {
  async create(req: Request, res: Response) {
    if (!req.body) throw new BadRequestError("Deve fornecer Body");

    const createParams = ServiceOrderCreateInput.parse(req.body);

    const service = new ServiceOrderService();
    const tarefa = await service.create(createParams);

    return res.status(201).json(tarefa);
  }

  async list(req: Request, res: Response) {
    const service = new ServiceOrderService();

    const tarefas = await service.list();
    return res.status(200).json(tarefas);
  }

  async idExist(req: Request, res: Response) {
    const id = Number(req.params.id);

    const service = new ServiceOrderService();
    await service.getById(id);

    return res.status(200);
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const service = new ServiceOrderService();
    const tarefa = await service.getById(id);

    return res.status(200).json(tarefa);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!req.body) throw new BadRequestError("Deve fornecer Body");

    const updateBody = ServiceOrderUpdateInput.parse(req.body);

    if (Object.values(updateBody).every((value) => value === undefined))
      throw new BadRequestError(
        "Body deve ter ao menos um paramentro de Tarefa",
      );

    const service = new ServiceOrderService();
    const tarefa = await service.update({
      id,
      ...updateBody,
    });

    return res.status(200).json(tarefa);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    const service = new ServiceOrderService();
    await service.delete(id);

    return res.status(204).json({ sucess: true });
  }
}

export { ServiceOrderController };
