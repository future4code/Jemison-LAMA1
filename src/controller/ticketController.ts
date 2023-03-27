import { Request, Response } from 'express';
import { TicketBusiness } from './../business/ticketBusiness';
import { AuthenticationTokenDTO } from "../model/class/DTO/authenticatonsDTO";
import * as dto from '../model/class/DTO/ticketDTOs'


export class TicketController {

    constructor(private ticketBusiness: TicketBusiness) { }

    public createTicket = async (req: Request, res: Response): Promise<void> => {

        try {

            const token = req.headers.auth as string
            const tokenInput = new AuthenticationTokenDTO(token)

            const { title, showId, price, totalTickets } = req.body
            const input = new dto.TicketCreateInputDTO(
                title,
                showId,
                price,
                totalTickets
            )
            const result = await this.ticketBusiness.createTicket(input, tokenInput)
            res.status(201).send(result)

        } catch (error: any) {
            res.status(400).send(error.message)
        }

    };


}