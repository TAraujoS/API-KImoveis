import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses.entity";
import { Categories } from "../../entities/categories.entity";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";
import { IPropertyRequest } from "../../interfaces/properties/properties.interfaces";

const createPropertiesServices = async ({
  value,
  size,
  address,
  categoryId,
}: IPropertyRequest): Promise<Properties> => {
  const propertyRepository = AppDataSource.getRepository(Properties);
  const categoriesRepository = AppDataSource.getRepository(Categories);
  const addressesRepository = AppDataSource.getRepository(Addresses);

  const category = await categoriesRepository.findOneBy({ id: categoryId });
  const findAddress = await addressesRepository.findOne({
    where: {
      zipCode: address.zipCode,
    },
  });

  if (findAddress) {
    throw new AppError("Address already exists");
  }
  const newAddress = addressesRepository.create({
    district: address.district,
    zipCode: address.zipCode,
    number: address.number,
    city: address.city,
    state: address.state,
  });

  await addressesRepository.save(newAddress);

  if (!category) {
    throw new AppError("Category not exists");
  }

  const newProperty = new Properties();
  newProperty.value = value;
  newProperty.size = size;
  newProperty.addresses = newAddress;
  newProperty.category = { ...category, properties: [] }; //estou pegando o category que foi buscado, e dizendo que apenas os meus properties que vão ser populados

  const property = propertyRepository.create(newProperty);

  await propertyRepository.save(property);

  return property;
};

export default createPropertiesServices;
