import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Addresses } from "./addresses.entity";
import { Categories } from "./categories.entity";
import { Schedules } from "./schedules.entity";

@Entity("properties")
class Properties {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: false })
  sold: boolean;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  value: number;

  @Column({ type: "integer" })
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Addresses)
  @JoinColumn()
  address: Addresses;

  @ManyToOne(() => Categories)
  category: Categories;

  @OneToMany(() => Schedules, (schedules) => schedules.properties)
  schedules: Schedules[];
}

export { Properties };
