import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";

const createCategoriesServices = async (name: string): Promise<Categories> => {
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const findCategory = await categoriesRepository.findOneBy({ name });

  if (findCategory) {
    throw new AppError("Category already exists");
  }
  // const category = new Categories();
  // category.name = name;

  const category = categoriesRepository.create({
    name,
  });

  categoriesRepository.create(category);

  await categoriesRepository.save(category);

  return category;
};

export default createCategoriesServices;
