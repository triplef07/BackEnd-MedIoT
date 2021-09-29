import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { List_Alat } from "../entity/List_Alat";
import { Data_Sensor } from "../entity/Data_Sensor";

export class AlatPasienController {
  private AlatRepository = getRepository(List_Alat);
  private DataSensorRepository = getRepository(Data_Sensor);

  async displayall(request: Request, response: Response, next: NextFunction) {
    let temp = await this.AlatRepository.find();
    return temp;
  }

  async displaynow(request: Request, response: Response, next: NextFunction) {
    let input = request.params.input;
    try {
      let cari = await this.AlatRepository.find({
        relations: ["data_sensor"],
        where: { id: input },
      });
      return cari;
    } catch (error) {
      return {
        err: error,
      };
    }
  }

  async displayreport(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    let input = request.params.input;
    try {
      let cari = await this.AlatRepository.find({
        relations: ["report"],
        where: { pasien: input },
      });
      return cari;
    } catch (error) {
      return {
        err: error,
      };
    }
  }

  async input(request: Request, response: Response, next: NextFunction) {
    let temp = request.body;
    await this.AlatRepository.save(temp);
    return {
      pesan: "Sudah diterima",
    };
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    let temp = request.params.idalat;
    try {
      let cari = await this.AlatRepository.find({
        where: { id: temp },
      });
      await this.AlatRepository.remove(cari);
      return "sukses dihapus";
    } catch (error) {
      console.log(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    let id = request.params.idalat;
    let lama = await this.AlatRepository.findOne({ where: { id: id } });
    let cari = await this.DataSensorRepository.find({
      where: { list_alat: lama.id },
    });
    await this.DataSensorRepository.remove(cari);
    let baru = { ...lama, ...request.body };
    await this.AlatRepository.save(baru);
    return "Upadte sukses";
  }
}
