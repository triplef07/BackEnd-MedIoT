import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Report } from "../entity/Report";
import { List_Alat } from "../entity/List_Alat";

export class ReportController {
  private reportRepository = getRepository(Report);
  private ListAlatRepository = getRepository(List_Alat);

  async all(request: Request, response: Response, next: NextFunction) {
    let temp = await this.reportRepository.find();
    return temp;
  }

  async get_tag(request: Request, response: Response, next: NextFunction) {
    let tag = request.params.tag;
    let temp = await this.reportRepository.find({ where: { tag: tag } });
    return temp;
  }

  async input(request: Request, response: Response, next: NextFunction) {
    let temp = request.body;
    let idpasien = request.body.idpasien;
    delete temp.idpasien;

    try {
      let baru = new Report();
      baru = temp;
      let cariid = await this.ListAlatRepository.findOne({
        where: { id: idpasien },
      });
      baru.list_alat = cariid;
      await this.reportRepository.save(baru);
      return "Berhasil Terkirimkan";
    } catch (error) {
      return {
        err: error,
      };
    }
  }

  async delete(request: Request, next: NextFunction) {
    let id = request.params.id;
    let cari = await this.reportRepository.find({ where: { id: id } });
    await this.reportRepository.remove(cari);
    return "Berhasil Dihapus";
  }

  async update(request: Request, response: Response, next: NextFunction) {
    let id = request.params.id;
    let cari = await this.reportRepository.findOne({ where: { id } });
    cari = { ...cari, ...request.body };
    await this.reportRepository.save(cari);
    return "Berhasil Diupdate";
  }
}
