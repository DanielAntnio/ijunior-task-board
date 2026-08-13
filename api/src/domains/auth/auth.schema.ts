import { z } from "zod";
import { Prisma, Status } from "../../../generated/prisma/client";

export const AuthSchema = z.object({
  email: z.email(),
  password: z.string(),
}) satisfies z.Schema<Prisma.UserCreateInput>;
