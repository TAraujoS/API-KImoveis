import { Router } from "express";
import {
  deleteUserController,
  updatedUserController,
  userCreateController,
  userListController,
} from "../controllers/users.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIdMiddleware from "../middlewares/ensureId.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";
import verifyUpdateMiddleware from "../middlewares/verifyUpdate.middleware";

const userRoutes = Router();

userRoutes.post("", userCreateController);
userRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  userListController
);
userRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureIdMiddleware,
  ensureIsAdmMiddleware,
  verifyUpdateMiddleware,
  updatedUserController
);
userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIdMiddleware,
  ensureIsAdmMiddleware,
  deleteUserController
);

export default userRoutes;
