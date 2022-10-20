import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Properties } from "./properties.entity";

@Entity("schedules")
class Schedules {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string; //Date tmb n está errado, typeorm vai levar em consideração o type "time"

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Properties)
  properties: Properties;
}

export { Schedules };
