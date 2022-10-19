import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";
import { ICategoryRequest } from "../../interfaces/categories/categories.interfaces.";

const createCategoriesServices = async (name: string): Promise<Categories> => {
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const findCategory = await categoriesRepository.findOneBy({ name });

  if (findCategory) {
    throw new AppError("Category already exists");
  }
  const category = new Categories();
  category.name = name;

  categoriesRepository.create(category);

  await categoriesRepository.save(category);

  return category;
};

export default createCategoriesServices;
