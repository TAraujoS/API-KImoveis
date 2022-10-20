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

  if (!date) {
    throw new AppError("Invalid Date");
  }

  if (hour.length < 8 || hour.length > 18) {
    throw new AppError("Invalid Hour");
  }

  // const weekDay = new Date().getDay;

  // if (weekDay === 0 || weekDay === 6) {
  //   throw new AppError("Invalid week day");
  // }

  // const newSchedule = schedulesRepository.create({
  //   date,
  //   hour,
  //   user: user,
  //   properties: property,
  // });

  const newSchedule = new Schedules();
  newSchedule.date = date;
  newSchedule.hour = hour;
  newSchedule.user = user;
  newSchedule.properties = property;

  await schedulesRepository.save(newSchedule);

  return newSchedule;
};

export default createSchedulesService;
