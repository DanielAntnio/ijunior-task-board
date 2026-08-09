import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../config/prismaClient";

class OrderService {
  async create(data: Prisma.OrderUncheckedCreateInput) {
    const novaTarefa = await prisma.order.create({ data });

    return novaTarefa;
  }

  async list() {
    const tarefas = await prisma.order.findMany();

    return tarefas;
  }

  async getById(id: number) {
    const tarefa = await prisma.order.findUniqueOrThrow({
      where: { id },
    });

    return tarefa;
  }

  async update({
    id,
    ...data
  }: { id: number } & Prisma.OrderUncheckedUpdateInput) {
    const tarefa = await prisma.order.update({
      where: { id },
      data,
    });

    return tarefa;
  }

  async delete(id: number) {
    await prisma.order.delete({ where: { id } });
  }
}

export { OrderService };
