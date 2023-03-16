import { Request, Response } from "express";
import BandBusiness from "../business/BandBusiness";
import { BandInputDTO } from "../model/class/DTO/bandDTOs";

export class BandController {
  constructor(private bandBusiness: BandBusiness) {}

  public bandRegister = async (req: Request, res: Response) => {
    try {
      const token: string = req.headers.authorization as string;
      const { name, music_genre, responsible } = req.body;
      const input: BandInputDTO = {
        name,
        music_genre,
        responsible,
      };

      await this.bandBusiness.bandRegister(input, token);

      res.status(201).send({ message: "Sua banda foi registrada com sucesso" });
    } catch (error: any) {
      if (res.statusCode === 200) {
        res.status(500).send({ message: error.message });
      } else {
        res
          .status(res.statusCode)
          .send({ message: error.sqlMessage || error.message });
      }
    }
  };
}