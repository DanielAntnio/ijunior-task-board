import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../config/prismaClient";

class OrderService {
  async create(data: Prisma.OrderUncheckedCreateInput) {
    const novaOrder = await prisma.order.create({ data });

    return novaOrder;
  }

  async list(userId: number, query: Prisma.OrderWhereInput) {
    const orders = await prisma.order.findMany({
      where: {
        created_by: userId,
        ...query,
      },
    });

    return orders;
  }

  async getById(id: number, userId: number) {
    const order = await prisma.order.findUniqueOrThrow({
      where: { id, created_by: userId },
    });

    return order;
  }

  async update({
    id,
    userId,
    ...data
  }: { id: number; userId: number } & Prisma.OrderUncheckedUpdateInput) {
    const order = await prisma.order.update({
      where: { id, created_by: userId },
      data,
    });

    return order;
  }

  async delete(id: number, userId: number) {
    await prisma.order.delete({ where: { id, created_by: userId } });
  }
}

export { OrderService };
