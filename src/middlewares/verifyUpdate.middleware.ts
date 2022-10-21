import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

const verifyUpdateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const info = Object.keys(req.body);

  if (info.includes("isAdm")) {
    throw new AppError("Impossible to update isAdm", 401);
  }

  if (info.includes("isActive")) {
    throw new AppError("Impossible to update isActive", 401);
  }

  if (info.includes("id")) {
    throw new AppError("Impossible to update id", 401);
  }

  return next();
};

export default verifyUpdateMiddleware;
