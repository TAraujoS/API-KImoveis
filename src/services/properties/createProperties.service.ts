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

  if (!category) {
    throw new AppError("Category not exists", 404);
  }

  if (findAddress) {
    throw new AppError("Address already exists");
  }

  if (address.zipCode.length > 8) {
    throw new AppError("Invalid zipCode");
  }

  if (address.state.length > 2) {
    throw new AppError("Invalid state");
  }

  const newAddress = addressesRepository.create({
    district: address.district,
    zipCode: address.zipCode,
    number: address.number,
    city: address.city,
    state: address.state,
  });

  await addressesRepository.save(newAddress);

  const newProperty = new Properties();
  newProperty.value = value;
  newProperty.size = size;
  newProperty.address = newAddress;
  newProperty.category = category;

  /*  -----SEGUNDA FORMA DE CRIAR-----
   const newProperty = propertyRepository.create({
     value,
     size,
     address: newAddress,
     category: category,
    }); */

  await propertyRepository.save(newProperty);

  return newProperty;
};

export default createPropertiesServices;
