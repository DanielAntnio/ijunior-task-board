import { z } from "zod";
import { Prisma, Status } from "../../../generated/prisma/client";

export const ClientCreateInput = z.object({
  name: z.string().trim(),
  email: z.email(),
  phone: z.e164(),
  created_at: z.optional(z.date()),
}) satisfies z.Schema<Prisma.ClientUncheckedCreateInput>;

export const ClientUpdateInput = z.object({
  name: z.optional(ClientCreateInput.shape.name),
  email: z.optional(ClientCreateInput.shape.email),
  phone: z.optional(ClientCreateInput.shape.phone),
  created_at: ClientCreateInput.shape.created_at,
}) satisfies z.Schema<Prisma.ClientUncheckedUpdateInput>;
