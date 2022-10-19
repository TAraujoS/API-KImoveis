import { Router } from "express";
import {
  createCategoriesController,
  listCategoriesController,
} from "../controllers/categories.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const categoriesRoutes = Router();

categoriesRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  createCategoriesController
);
categoriesRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  listCategoriesController
);
categoriesRoutes.get("/:id/properties");

export default categoriesRoutes;
