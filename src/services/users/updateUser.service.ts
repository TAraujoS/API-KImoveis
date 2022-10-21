import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { hashSync } from "bcrypt";
import { IUserUpdate } from "../../interfaces/users/users.interfaces";

const updateUserService = async (
  { name, email, password }: IUserUpdate,
  id: string
): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id,
  });

  await userRepository.update(id, {
    name: name ? name : findUser!.name,
    email: email ? email : findUser!.email,
    password: password ? hashSync(password, 10) : findUser!.password,
  });

  const updatedUser = await userRepository.findOneBy({ id });

  return updatedUser!;
};

export default updateUserService;
