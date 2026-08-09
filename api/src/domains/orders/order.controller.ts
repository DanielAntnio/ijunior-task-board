import type { Request, Response } from "express";
import { BadRequestError } from "../../utils/api-erros";
import { OrderService } from "./order.service";
import { OrderCreateInput, OrderUpdateInput } from "./order.schema";

class OrderController {
  async create(req: Request, res: Response) {
    if (!req.body) throw new BadRequestError("Deve fornecer Body");

    const userId = req.user!.id;
    const createParams = OrderCreateInput.parse({
      ...req.body,
      created_by: userId,
    });

    const service = new OrderService();
    const order = await service.create(createParams);

    return res.status(201).json(order);
  }

  async list(req: Request, res: Response) {
    const service = new OrderService();
    const userId = req.user!.id;

    const orders = await service.list(userId);
    return res.status(200).json(orders);
  }

  async idExist(req: Request, res: Response) {
    const id = Number(req.params.id);
    const userId = req.user!.id;

    const service = new OrderService();
    await service.getById(id, userId);

    return res.status(200).json({ success: true });
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const userId = req.user!.id;

    const service = new OrderService();
    const order = await service.getById(id, userId);

    return res.status(200).json(order);
  }

  async update(req: Request, res: Response) {
    if (!req.body) throw new BadRequestError("Deve fornecer Body");

    const id = Number(req.params.id);
    const userId = req.user!.id;
    const updateBody = OrderUpdateInput.parse(req.body);

    if (Object.values(updateBody).every((value) => value === undefined))
      throw new BadRequestError(
        `Body deve ter ao menos um paramentro de ordem (${Object.keys(OrderUpdateInput.keyof().enum).join(", ")})`,
      );

    const service = new OrderService();
    const order = await service.update({
      id,
      userId,
      ...updateBody,
    });

    return res.status(200).json(order);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const userId = req.user!.id;

    const service = new OrderService();
    await service.delete(id, userId);

    return res.status(204).json({ sucess: true });
  }
}

export { OrderController };
