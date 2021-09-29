import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Data_Sensor } from "./Data_Sensor";
import { Report } from "./Report";

@Entity()
export class List_Alat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lokasi: string;

  @Column({ nullable: true })
  pasien: string;

  @OneToMany(() => Data_Sensor, (data_sensor) => data_sensor.list_alat)
  data_sensor: Data_Sensor[];

  @OneToMany(() => Report, (report) => report.list_alat)
  report: Report[];
}
