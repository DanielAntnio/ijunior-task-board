import { z } from "zod";
import { Prisma, Status } from "../../../generated/prisma/client";

export const ServiceOrderCreateInput = z.object({
  client_id: z.coerce.number().refine((val) => !isNaN(val) && isFinite(val)),
  issue: z.string().trim(),
  status: z.string().toUpperCase().trim().pipe(z.enum(Status)),
  created_at: z.optional(z.date()),
}) satisfies z.Schema<Prisma.ServiceOrderUncheckedCreateInput>;

export const ServiceOrderUpdateInput = z.object({
  client_id: z.optional(ServiceOrderCreateInput.shape.client_id),
  issue: z.optional(ServiceOrderCreateInput.shape.issue),
  status: z.optional(ServiceOrderCreateInput.shape.status),
  created_at: ServiceOrderCreateInput.shape.created_at,
}) satisfies z.Schema<Prisma.ServiceOrderUncheckedUpdateInput>;
