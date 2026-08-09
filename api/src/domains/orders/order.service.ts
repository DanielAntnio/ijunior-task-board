import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../config/prismaClient";

class OrderService {
  async create(data: Prisma.OrderUncheckedCreateInput) {
    const novaTarefa = await prisma.order.create({ data });

    return novaTarefa;
  }

  async list(userId: number) {
    const tarefas = await prisma.order.findMany({
      where: {
        created_by: userId,
      },
    });

    return tarefas;
  }

  async getById(id: number, userId: number) {
    const tarefa = await prisma.order.findUniqueOrThrow({
      where: { id, created_by: userId },
    });

    return tarefa;
  }

  async update({
    id,
    userId,
    ...data
  }: { id: number; userId: number } & Prisma.OrderUncheckedUpdateInput) {
    const tarefa = await prisma.order.update({
      where: { id, created_by: userId },
      data,
    });

    return tarefa;
  }

  async delete(id: number, userId: number) {
    await prisma.order.delete({ where: { id, created_by: userId } });
  }
}

export { OrderService };
