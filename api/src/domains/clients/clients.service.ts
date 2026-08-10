import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../config/prismaClient";

class ClientService {
  async create(data: Prisma.ClientUncheckedCreateInput) {
    const novaClient = await prisma.client.create({ data });

    return novaClient;
  }

  async list(search: string | undefined) {
    const clients = await prisma.client.findMany({
      where: {
        OR: !search
          ? undefined
          : [
              { name: { contains: search } },
              { email: { contains: search } },
              { phone: { contains: search } },
            ],
      },
    });

    return clients;
  }

  async getById(id: number) {
    const client = await prisma.client.findUniqueOrThrow({ where: { id } });

    return client;
  }

  async update({
    id,
    ...data
  }: { id: number } & Prisma.ClientUncheckedUpdateInput) {
    const client = await prisma.client.update({
      where: { id },
      data,
    });

    return client;
  }

  async delete(id: number) {
    await prisma.client.delete({ where: { id } });
  }
}

export { ClientService };
