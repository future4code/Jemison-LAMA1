import { Request, Response } from "express";
import { ShowBusiness } from "../business/showBusiness";
import { AuthenticationTokenDTO } from "../model/class/DTO/authenticatonsDTO";
import * as dto from '../model/class/DTO/showDTOs'

export class ShowController {

    constructor(private showBusiness: ShowBusiness) { }

    public createShow = async (req: Request, res: Response): Promise<void> => {

        try {

            const token = req.headers.auth as string
            const tokenInput = new AuthenticationTokenDTO(token)

            const { weekDay, startTime, endTime, bandId } = req.body
            const input = new dto.ShowCreateInputDTO(
                weekDay,
                startTime,
                endTime,
                bandId
            )

            const result = await this.showBusiness.createShow(input, tokenInput)

            res.status(201).send(result)

        } catch (error: any) {
            res.status(400).send(error.message)
        }

    };

    public getShowsByDayWeek = async (req: Request, res: Response): Promise<void> => {

        try {

            const token = req.headers.auth as string
            const tokenInput = new AuthenticationTokenDTO(token)

            const { weekDay } = req.body
            const input = new dto.showGetByWeekDayDTO(
                weekDay
            )

            const result = await this.showBusiness.getShowByWeekDay(input, tokenInput)

            res.status(201).send(result)

        } catch (error: any) {
            res.status(400).send(error.message)
        }

    };

}