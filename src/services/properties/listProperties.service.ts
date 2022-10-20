import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";

const listPropertiesService = async (): Promise<Properties[]> => {
  const propertiesRepository = AppDataSource.getRepository(Properties);

  const findProperties = propertiesRepository.find();

  return findProperties;
};

export default listPropertiesService;
