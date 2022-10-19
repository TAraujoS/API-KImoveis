import { Request, Response } from "express";
import { IPropertyRequest } from "../interfaces/properties/properties.interfaces";
import createPropertiesServices from "../services/properties/createProperties.service";

const createPropertiesController = async (req: Request, res: Response) => {
  const data: IPropertyRequest = req.body;

  const createdProperty = await createPropertiesServices(data);
  return res.status(201).json({
    message: "Property Created",
    property: createdProperty,
  });
};

export default createPropertiesController;
