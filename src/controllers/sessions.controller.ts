import { Request, Response } from "express";
import { IUserLogin } from "../interfaces/users/users.interfaces";
import createSessionService from "../services/sessions/createSession.service";

const createSessionController = async (req: Request, res: Response) => {
  const data: IUserLogin = req.body;
  const token = await createSessionService(data);

  return res.json({ token });
};

export { createSessionController };
