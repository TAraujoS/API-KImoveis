import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";

const ensureIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const userRepository = AppDataSource.getRepository(User);

  const foundUser = await userRepository.findOneBy({
    id,
  });

  if (!foundUser) {
    throw new AppError("Invalid id or not exists", 404);
  }

  req.foundUser = foundUser;

  return next();
};

export default ensureIdMiddleware;
