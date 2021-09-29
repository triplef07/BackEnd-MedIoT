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
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float" })
  temp_avg: number;

  @Column({ type: "float" })
  temp_min: number;

  @Column({ type: "float" })
  temp_max: number;

  @Column({ type: "float" })
  ppg_avg: number;

  @Column({ type: "float" })
  ppg_min: number;

  @Column({ type: "float" })
  ppg_max: number;

  @Column({ type: "float" })
  ekg_avg: number;

  @Column({ type: "float" })
  ekg_min: number;

  @Column({ type: "float" })
  ekg_max: number;

  @Column({ type: "float" })
  nivac_avg: number;

  @Column({ type: "float" })
  nivac_min: number;

  @Column({ type: "float" })
  nivac_max: number;

  // @Column()
  // id_alat: number;

  @ManyToOne(() => List_Alat, (list_alat) => list_alat.id, {
    onDelete: "CASCADE",
  })
  list_alat: List_Alat;

  @Column()
  tag: string;

  @CreateDateColumn({ type: "datetime" })
  createdDate: Date;

  @UpdateDateColumn({ type: "datetime" })
  updatedDate: Date;
}
