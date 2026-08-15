import ms, { StringValue } from "ms";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AuthSchema } from "./auth.schema";
import { UnauthorizeddError } from "../../utils/api-erros";

const authService = new AuthService();

export class AuthController {
  async me(req: Request, res: Response) {
    return res.status(200).json({ user: req.user });
  }

  async register(req: Request, res: Response) {
    const data = AuthSchema.parse(req.body);
    const user = await authService.register(data);
    return res.status(201).json(user);
  }

  async login(req: Request, res: Response) {
    const data = AuthSchema.parse(req.body);
    const { acessToken, refreshToken, user } = await authService.login(data);

    res.cookie("token", acessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: ms(String(process.env.JWT_EXPIRES_IN) as StringValue),
    });

    res.cookie("refresh", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: ms(String(process.env.JWT_REFRESH_EXPIRES_IN) as StringValue),
    });

    return res.status(200).json({ user });
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies?.refresh as string | undefined;

    if (!refreshToken) throw new UnauthorizeddError("Refresh não fornecido");

    try {
      const { acessToken, user } = await authService.refresh(refreshToken);

      res.cookie("token", acessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: ms(String(process.env.JWT_EXPIRES_IN) as StringValue),
      });

      return res.status(200).json({ user });
    } catch {
      throw new UnauthorizeddError("Refresh não fornecido");
    }
  }

  async logout(req: Request, res: Response) {
    res.clearCookie("token");
    res.clearCookie("refresh");
    return res.status(200).json({ message: "Logout realizado com sucesso" });
  }
}
