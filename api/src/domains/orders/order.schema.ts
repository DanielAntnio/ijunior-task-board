import { z } from "zod";
import { Prisma, Status } from "../../../generated/prisma/client";

export const OrderCreateInput = z.object({
  client_id: z.coerce.number().refine((val) => !isNaN(val) && isFinite(val)),
  device: z.string().trim(),
  issue: z.string().trim(),
  status: z.optional(z.string().toUpperCase().trim().pipe(z.enum(Status))),
  created_by: z.number(),
}) satisfies z.Schema<Prisma.OrderUncheckedCreateInput>;

export const OrderUpdateInput =
  OrderCreateInput.partial() satisfies z.Schema<Prisma.OrderUncheckedUpdateInput>;

export const OrderQuery = OrderUpdateInput.pick({
  status: true,
}) satisfies z.Schema<Prisma.OrderWhereInput>;
