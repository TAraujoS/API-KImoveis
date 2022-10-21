import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import {
  IUserRequest,
  IUserUpdate,
} from "../interfaces/users/users.interfaces";
import deleteUserService from "../services/users/deleteUser.service";
import updateUserService from "../services/users/updateUser.service";
import userCreateService from "../services/users/userCreate.service";
import userListService from "../services/users/userList.service";
import { User } from "../entities/user.entity";

const userCreateController = async (req: Request, res: Response) => {
  const user: IUserRequest = req.body;

  const newUser = await userCreateService(user);

  return res.status(201).json(instanceToPlain(newUser));
};

const userListController = async (req: Request, res: Response) => {
  const users = await userListService();

  return res.json(instanceToPlain(users));
};

const updatedUserController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const user: IUserUpdate = req.body;

  const updatedUser = await updateUserService(user, id);

  return res.status(200).json({
    message: "User Updated",
    user: updatedUser,
  });
};

const deleteUserController = async (req: Request, res: Response) => {
  const user: User = req.foundUser;

  await deleteUserService(user);

  return res.status(204).json();
};

export {
  userCreateController,
  userListController,
  updatedUserController,
  deleteUserController,
};
