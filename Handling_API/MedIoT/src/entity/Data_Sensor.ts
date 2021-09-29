import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { List_Alat } from "./List_Alat";

@Entity()
export class Data_Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float" })
  temp: number;

  @Column({ type: "float" })
  ppg: number;

  @Column({ type: "float" })
  ekg: number;

  @Column({ type: "float" })
  nivac: number;

  // @Column()
  // id_alat: number;

  @ManyToOne(() => List_Alat, (list_alat) => list_alat.id, {
    onDelete: "CASCADE",
  })
  list_alat: List_Alat;

  @CreateDateColumn({ type: "datetime" })
  createdDate: Date;

  @UpdateDateColumn({ type: "datetime" })
  updatedDate: Date;
}
