import { z } from "zod";
import { Prisma } from "../../../generated/prisma/client";

export const ClientCreateInput = z.object({
  name: z.string().trim(),
  email: z.email(),
  phone: z.e164(),
  created_at: z.optional(z.date()),
}) satisfies z.Schema<Prisma.ClientUncheckedCreateInput>;

export const ClientUpdateInput = ClientCreateInput.partial({
  email: true,
  name: true,
  phone: true,
}) satisfies z.Schema<Prisma.ClientUncheckedUpdateInput>;

export const ClientSearch = z.object({
  search: z.optional(z.string().trim()),
});
