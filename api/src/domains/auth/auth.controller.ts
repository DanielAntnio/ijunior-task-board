import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AuthSchema } from "./auth.schema";

const authService = new AuthService();

export class AuthController {
  async me(req: Request, res: Response) {
    return res.status(200).json({ usuario: req.user });
  }

  async register(req: Request, res: Response) {
    const data = AuthSchema.parse(req.body);
    const user = await authService.register(data);
    return res.status(201).json(user);
  }

  async login(req: Request, res: Response) {
    const data = AuthSchema.parse(req.body);
    const { token, user } = await authService.login(data);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({ user });
  }

  async logout(req: Request, res: Response) {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout realizado com sucesso" });
  }
}
