import { z } from "zod";
import { Prisma, Status } from "../../../generated/prisma/client";

export const OrderCreateInput = z.object({
  client_id: z.coerce.number().refine((val) => !isNaN(val) && isFinite(val)),
  issue: z.string().trim(),
  status: z.string().toUpperCase().trim().pipe(z.enum(Status)),
  created_at: z.optional(z.date()),
  created_by: z.number()
}) satisfies z.Schema<Prisma.OrderUncheckedCreateInput>;

export const OrderUpdateInput = z.object({
  client_id: z.optional(OrderCreateInput.shape.client_id),
  issue: z.optional(OrderCreateInput.shape.issue),
  status: z.optional(OrderCreateInput.shape.status),
  created_at: OrderCreateInput.shape.created_at,
}) satisfies z.Schema<Prisma.OrderUncheckedUpdateInput>;
