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
  //getDay() verifica o dia da semana e retorna um numero de 0 - 6, sendo 0 domingo e 6 sábado
  if (weekDay === 0 || weekDay === 6) {
    throw new AppError("Invalid week day");
  }
  // hour está vindo como string ("10:30")
  const arrHour = hour.split(":");
  //Eu separo os dois a partir do : e se cria um array [10, 30]
  const newHour = parseInt(arrHour[0]);
  //Eu seleciono a primeira posição, e tranformo a string em um numero
  if (newHour < 8 || newHour >= 18) {
    throw new AppError("Invalid Hour");
  }

  // const newSchedule = new Schedules();
  // newSchedule.date = date;
  // newSchedule.hour = hour;
  // newSchedule.user = user;
  // newSchedule.properties = property;

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
