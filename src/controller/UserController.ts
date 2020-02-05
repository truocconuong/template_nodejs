import { Request, Response } from "express";
import UserRepository from "../app/Repositories/UserRepository";

class UserController {
  async all(request: Request, response: Response) {
    console.log(request.user_id);
    const result = await new UserRepository().getAll();
    response.json(result);
  }
}
export default UserController;
