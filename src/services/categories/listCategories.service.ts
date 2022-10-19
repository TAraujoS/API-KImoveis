import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";

const listCategoriesServices = async (): Promise<Categories[]> => {
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const categories = categoriesRepository.find();

  return categories;
};

export default listCategoriesServices;
