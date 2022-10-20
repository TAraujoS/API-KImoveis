import { Request, Response } from "express";
import createCategoriesServices from "../services/categories/createCategories.service";
import listCategoriesServices from "../services/categories/listCategories.service";
import listPropertiesCategoryService from "../services/categories/listPropetiesCategory.service";

const createCategoriesController = async (req: Request, res: Response) => {
  const data: string = req.body;

  const createdCategory = await createCategoriesServices(data);

  return res.status(201).json(createdCategory);
};

const listCategoriesController = async (req: Request, res: Response) => {
  const categories = await listCategoriesServices();

  return res.json(categories);
};

const listPropertiesCategoryController = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  const categories = await listPropertiesCategoryService(id);

  return res.json(categories);
};

export {
  createCategoriesController,
  listCategoriesController,
  listPropertiesCategoryController,
};
