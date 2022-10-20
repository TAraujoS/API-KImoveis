import { Router } from "express";
import {
  createSchedulesContoller,
  listSchedulesPropertiesController,
} from "../controllers/schedules.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const schedulesRoutes = Router();

schedulesRoutes.post("", ensureAuthMiddleware, createSchedulesContoller);
schedulesRoutes.get(
  "/properties/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  listSchedulesPropertiesController
);

export default schedulesRoutes;
