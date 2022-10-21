import { Router } from "express";
import {
  createPropertiesController,
  listPropertiesController,
} from "../controllers/properties.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const propertiesRoutes = Router();

propertiesRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  createPropertiesController
);
propertiesRoutes.get("", listPropertiesController);

export default propertiesRoutes;
