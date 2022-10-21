import { hash } from "bcrypt";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUserRequest } from "../../interfaces/users/users.interfaces";

const userCreateService = async ({
  name,
  email,
  password,
  isAdm,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({ email });

  if (findUser) {
    throw new AppError("Email already registered");
  }

  if (!password) {
    throw new AppError("Passowrd is missing");
  }

  const hashedPassword = await hash(password, 10);
  const isActive = true;

  const user = userRepository.create({
    name,
    email,
    password: hashedPassword,
    isAdm,
    isActive,
  });

  await userRepository.save(user);

  return user;
};

export default userCreateService;
