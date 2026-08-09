import bcrypt from "bcrypt";
import { prisma } from "../../config/prismaClient";
import { generateToken } from "../../utils/token";
import { ApiError, UnauthorizeddError } from "../../utils/api-erros";
import { Prisma } from "../../../generated/prisma/client";

const SALT_ROUNDS = 10;

export class AuthService {
  async register({ email, password }: Prisma.UserCreateInput) {
    const existentUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existentUser) throw new ApiError("Email já cadastrado", 409);

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: { email, password: passwordHash },
      select: { id: true, email: true },
    });

    return user;
  }

  async login({ email, password }: Prisma.UserCreateInput) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new UnauthorizeddError("Credenciais inválidas");

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) throw new UnauthorizeddError("Credenciais inválidas");

    const token = generateToken({ id: user.id, email: user.email });

    return { token, user: { id: user.id, email: user.email } };
  }
}
