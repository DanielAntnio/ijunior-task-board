import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../config/prismaClient";

class ClientService {
  async create(data: Prisma.ClientUncheckedCreateInput) {
    const novaTarefa = await prisma.client.create({ data });

    return novaTarefa;
  }

  async list() {
    const tarefas = await prisma.client.findMany();

    return tarefas;
  }

  async getById(id: number) {
    const tarefa = await prisma.client.findUniqueOrThrow({ where: { id } });

    return tarefa;
  }

  async update({
    id,
    ...data
  }: { id: number } & Prisma.ClientUncheckedUpdateInput) {
    const tarefa = await prisma.client.update({
      where: { id },
      data,
    });

    return tarefa;
  }

  async delete(id: number) {
    await prisma.client.delete({ where: { id } });
  }
}

export { ClientService };
