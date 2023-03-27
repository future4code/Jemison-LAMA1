import { BandBusiness } from './../business/bandBusiness';
import { Request, Response } from "express";
import { AuthenticationTokenDTO } from '../model/class/DTO/authenticatonsDTO';
import * as dto from '../model/class/DTO/bandDTOs'


export class BandController {
    constructor(private bandBusiness: BandBusiness) { }

    public bandRegister = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.auth as string
            const tokenInput = new AuthenticationTokenDTO(token)

            const { name, musicGenre, responsible } = req.body;
            const input = new dto.BandInputDTO(
              name,
              musicGenre,
              responsible,
            )

            const result = await this.bandBusiness.bandRegister(input, tokenInput);

            res.status(201).send(result);
        
        } catch (error: any) {
            res.status(400).send(error.message)
        }

    };

    public getBandDetails = async (req: Request, res: Response) => {
        try {
    
          const token = req.headers.auth as string
          const inputToken = new AuthenticationTokenDTO(token)
    
          const { bandIdOrName } = req.body;
          const input = new dto.GetBandDetailsInputDTO(
            bandIdOrName
          )
    
          const result = await this.bandBusiness.getBandDetails(input, inputToken)
    
          res.status(201).send(result);
    
        } catch (error: any) {
          res.status(400).send(error.message)
        }
      };
}