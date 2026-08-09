import type { Request, Response } from "express";
import { ClientCreateInput, ClientUpdateInput } from "./clients.schema";
import { ClientService } from "./clients.service";
import { BadRequestError } from "../../utils/api-erros";

class ClientController {
  async create(req: Request, res: Response) {
    if (!req.body) throw new BadRequestError("Deve fornecer Body");

    const createParams = ClientCreateInput.parse(req.body);

    const service = new ClientService();
    const client = await service.create(createParams);

    return res.status(201).json(client);
  }

  async list(req: Request, res: Response) {
    const service = new ClientService();

    const clients = await service.list();
    return res.status(200).json(clients);
  }

  async idExist(req: Request, res: Response) {
    const id = Number(req.params.id);

    const service = new ClientService();
    await service.getById(id);

    return res.status(200);
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const service = new ClientService();
    const client = await service.getById(id);

    return res.status(200).json(client);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!req.body) throw new BadRequestError("Deve fornecer Body");

    const updateBody = ClientUpdateInput.parse(req.body);

    if (Object.values(updateBody).every((value) => value === undefined))
      throw new BadRequestError(
        "Body deve ter ao menos um paramentro de Tarefa",
      );

    const service = new ClientService();
    const client = await service.update({
      id,
      ...updateBody,
    });

    return res.status(200).json(client);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    const service = new ClientService();
    await service.delete(id);

    return res.status(204).json({ sucess: true });
  }
}

export { ClientController };
