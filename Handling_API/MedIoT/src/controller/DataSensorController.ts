import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Data_Sensor } from "../entity/Data_Sensor";
import { List_Alat } from "../entity/List_Alat";

export class DataSensorController {
  private DataSensorRepository = getRepository(Data_Sensor);
  private ListAlatRepository = getRepository(List_Alat);

  async all(request: Request, response: Response, next: NextFunction) {
    let temp = await this.DataSensorRepository.find();
    return temp;
  }

  async input(request: Request, response: Response, next: NextFunction) {
    let temp = request.body;
    let idpasien = temp.idpasien;
    delete temp.pasien;
    try {
      let cari = await this.ListAlatRepository.findOne({
        where: { id: idpasien },
      });
      let data = new Data_Sensor();
      data = temp;
      data.list_alat = cari;
      await this.DataSensorRepository.save(data);
      return "Sukses disimpan";
    } catch (error) {
      return {
        err: error,
      };
    }
  }
  async delete(request: Request, response: Response, next: NextFunction) {
    let temp = request.params.id;
    try {
      let cari = await this.DataSensorRepository.find({ where: { id: temp } });
      await this.DataSensorRepository.remove(cari);
      return "sukses dihapus";
    } catch (error) {
      return {
        err: error,
      };
    }
  }
  async update(request: Request, response: Response, next: NextFunction) {
    let temp = request.params.id;
    // let baru = request.body;
    try {
      let cari = await this.DataSensorRepository.findOne({
        where: { id: temp },
      });
      cari = { ...cari, ...request.body };
      //   console.log(temp.body);
      console.log(cari);
      await this.DataSensorRepository.save(cari);
      return "Sukses di update";
    } catch (error) {
      return {
        err: error,
      };
    }
  }
}
