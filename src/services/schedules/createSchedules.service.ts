import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { Schedules } from "../../entities/schedules.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IScheduleRequest } from "../../interfaces/schedules";

const createSchedulesService = async ({
  userId,
  propertyId,
  date,
  hour,
}: IScheduleRequest): Promise<Schedules> => {
  const userRepository = AppDataSource.getRepository(User);
  const propertyRepository = AppDataSource.getRepository(Properties);
  const schedulesRepository = AppDataSource.getRepository(Schedules);

  const user = await userRepository.findOneBy({ id: userId });
  const property = await propertyRepository.findOneBy({ id: propertyId });
  const schedules = await schedulesRepository.findOne({
    where: {
      date,
      hour,
    },
  });

  if (!user) {
    throw new AppError("User not exists", 404);
  }

  if (!property) {
    throw new AppError("Property not exists", 404);
  }

  if (schedules) {
    throw new AppError("Schedule already exists");
  }

  const weekDay = new Date(date).getDay();
  if (weekDay === 0 || weekDay === 6) {
    throw new AppError("Invalid week day");
  }

  const arrHour = hour.split(":");
  const newHour = parseInt(arrHour[0]);
  if (newHour < 8 || newHour >= 18) {
    throw new AppError("Invalid Hour");
  }

  const newSchedule = schedulesRepository.create({
    date,
    hour,
    user: user,
    properties: property,
  });

  await schedulesRepository.save(newSchedule);

  return newSchedule;
};

export default createSchedulesService;
