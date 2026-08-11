import bcrypt from "bcrypt";
import { prisma } from "../../config/prismaClient";
import {
  generateRefreshToken,
  generateToken,
  verifyRefreshyToken,
} from "../../utils/token";
import {
  ConflictError,
  UnauthorizeddError,
} from "../../utils/api-erros";
import { Prisma } from "../../../generated/prisma/client";

const SALT_ROUNDS = 10;

export class AuthService {
  async register({ email, password }: Prisma.UserCreateInput) {
    const existentUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existentUser) throw new ConflictError("Email já cadastrado");

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

    if (!isCorrectPassword)
      throw new UnauthorizeddError("Credenciais inválidas");

    const acessToken = generateToken({ id: user.id, email: user.email });
    const refreshToken = generateRefreshToken({ id: user.id });

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return {
      acessToken,
      refreshToken,
      user: { id: user.id, email: user.email },
    };
  }

  async refresh(refreshToken: string) {
    const payload = verifyRefreshyToken(refreshToken);

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: payload.id, refreshToken },
    });

    const acessToken = generateToken({ id: user.id, email: user.email });

    return {
      acessToken,
      user: { id: user.id, email: user.email },
    };
  }

  async logout(refreshToken: string | undefined) {
    if (!refreshToken) return;

    await prisma.user.updateMany({
      where: { refreshToken },
      data: { refreshToken: null },
    });
  }
}
