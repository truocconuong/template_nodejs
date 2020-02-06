import { Request, Response } from "express";
import { UserRepository } from "../app/Repositories";
import Auth from "../app/Services/Auth";
export class AuthController {
  async login(req: Request, res: Response) {
    const data = req.body;
    const repository = new UserRepository();
    const user = await repository.getByEmail(data.email);
    if (!user) {
      throw new Error("User not found");
    }
    const isValidPassword = new Auth().check(data.password, user.password);
    if (isValidPassword === false) {
      throw new Error("Password not match");
    }

    res.json({ token: new Auth().generateToken(user) });
  }

  async register(req: Request, res: Response) {
    const data = Object.assign(req.body, { status: 1 });
    const repository = new UserRepository();
    const check = await repository.getByEmail(data.email);
    if (check) {
      throw new Error("Email is existing");
    }
    const user = await repository.create(data);
    res.json({ token: new Auth().generateToken(user) });
  }
}
