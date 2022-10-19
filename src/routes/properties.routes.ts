import { Router } from "express";
import createPropertiesController from "../controllers/properties.controller";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const propertiesRoutes = Router();

propertiesRoutes.post("", ensureIsAdmMiddleware, createPropertiesController);

export default propertiesRoutes;
