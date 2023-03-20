import { TicketSalesBusiness } from './../business/ticketSalesBusiness';
import { AuthenticationTokenDTO } from "../model/class/DTO/authenticatonsDTO";
import { Request, Response } from "express";
import * as dto from '../model/class/DTO/ticketSalesDTOs'

export class TicketSalesController {

    constructor(private ticketSalesBusiness: TicketSalesBusiness) { }

    public createTicketSale = async (req: Request, res: Response): Promise<void> => {

        try {

            const token = req.headers.auth as string
            const tokenInput = new AuthenticationTokenDTO(token)

            const {ticketId, quantity } = req.body
            const input = new dto.TicketSalesCreateInput(
             ticketId,
             quantity
            )

            const result = await this.ticketSalesBusiness.creatTicketSales(input, tokenInput)

            res.status(201).send(result)

        } catch (error: any) {
            res.status(400).send(error.message)
        }

    };
}