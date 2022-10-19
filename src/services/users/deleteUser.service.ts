import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const deleteUserService = async (user: User): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);

  if (!user.isActive) {
    throw new AppError("User is already inactive");
  }

  await userRepository.update(user.id, { isActive: false });
};

export default deleteUserService;
