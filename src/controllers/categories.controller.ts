import { Request, Response } from "express";
import { ICategoryRequest } from "../interfaces/categories/categories.interfaces.";
import createCategoriesServices from "../services/categories/createCategories.service";
import listCategoriesServices from "../services/categories/listCategories.service";

const createCategoriesController = async (req: Request, res: Response) => {
  const data: string = req.body;

  const createdCategory = await createCategoriesServices(data);

  return res.status(201).json({
    message: "Category created",
    category: createdCategory,
  });
};

const listCategoriesController = async (req: Request, res: Response) => {
  const categories = await listCategoriesServices();

  return res.json(categories);
};

export { createCategoriesController, listCategoriesController };
