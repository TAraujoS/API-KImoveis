import { Request, Response } from "express";
import { IPropertyRequest } from "../interfaces/properties/properties.interfaces";
import createPropertiesServices from "../services/properties/createProperties.service";
import listPropertiesService from "../services/properties/listProperties.service";

const createPropertiesController = async (req: Request, res: Response) => {
  const data: IPropertyRequest = req.body;

  const createdProperty = await createPropertiesServices(data);
  return res.status(201).json(createdProperty);
};

const listPropertiesController = async (req: Request, res: Response) => {
  const properties = await listPropertiesService();

  return res.json(properties);
};

export { createPropertiesController, listPropertiesController };
