import { Request, Response } from "express";
import createSchedulesService from "../services/schedules/createSchedules.service";
import listSchedulesPropertiesService from "../services/schedules/listSchedules.service";

const createSchedulesContoller = async (req: Request, res: Response) => {
  const data = req.body;
  const schedules = await createSchedulesService(data);

  return res.status(201).json({ message: "Created", ...schedules });
};

const listSchedulesPropertiesController = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  const schedules = await listSchedulesPropertiesService(id);

  return res.json(schedules);
};

export { createSchedulesContoller, listSchedulesPropertiesController };
