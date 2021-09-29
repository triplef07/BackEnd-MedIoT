import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

export class UserController {
  private userRepository = getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    let temp = await this.userRepository.find();
    return temp;
  }

  async cek(request: Request, response: Response) {
    let temp = request.body;
    try {
      let cari = await this.userRepository.find({
        select: ["user", "password"],
        where: {
          user: temp.user,
          password: temp.password,
        },
      });
      // console.log(cari);
      if (cari.length === 0) {
        return "Username atau password salah";
      } else {
        return "Sukses Login!";
      }
    } catch (error) {
      return {
        err: error,
      };
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    let temp = request.body;
    try {
      await this.userRepository.save(temp);
      return "sukses disimpan";
    } catch (error) {
      return {
        err: error,
      };
    }
  }

  async remove(request: Request, response: Response) {
    let temp = request.params.id;
    try {
      let cari = await this.userRepository.find({
        where: {
          id: temp,
        },
      });
      await this.userRepository.remove(cari);
      return "sukses dihapus";
    } catch (error) {
      return {
        err: error,
      };
    }
  }

  async update(request: Request, response: Response) {
    let temp = request.body;
    try {
      let cari = await this.userRepository.findOne({
        where: {
          user: temp.user_lama,
          password: temp.password_lama,
        },
      });
      // console.log(cari);
      if (cari === undefined) {
        return "Akun Tidak ditemukan";
      } else {
        let beta = {
          user: temp.user_baru,
          password: temp.password_baru,
        };
        let final = { ...cari, ...beta };
        await this.userRepository.save(final);
        return "Sukses dirubah!";
      }
    } catch (error) {
      return {
        err: error,
      };
    }
  }
}
