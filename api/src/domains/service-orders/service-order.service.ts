import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../config/prismaClient";

class ServiceOrderService {
  async create(data: Prisma.ServiceOrderUncheckedCreateInput) {
    const novaTarefa = await prisma.serviceOrder.create({ data });

    return novaTarefa;
  }

  async list() {
    const tarefas = await prisma.serviceOrder.findMany();

    return tarefas;
  }

  async getById(id: number) {
    const tarefa = await prisma.serviceOrder.findUniqueOrThrow({
      where: { id },
    });

    return tarefa;
  }

  async update({
    id,
    ...data
  }: { id: number } & Prisma.ServiceOrderUncheckedUpdateInput) {
    const tarefa = await prisma.serviceOrder.update({
      where: { id },
      data,
    });

    return tarefa;
  }

  async delete(id: number) {
    await prisma.serviceOrder.delete({ where: { id } });
  }
}

export { ServiceOrderService };
