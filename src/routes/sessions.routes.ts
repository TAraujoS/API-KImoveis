import { Router } from "express";
import { createSessionController } from "../controllers/sessions.controller";

const sessionRoutes = Router();

sessionRoutes.post("", createSessionController);

export default sessionRoutes;
