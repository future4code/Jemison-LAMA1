import { Request, Response } from "express";
import { EventPhotosBusiness } from './../business/eventPhotosBusiness';
import { AuthenticationTokenDTO } from "../model/class/DTO/authenticatonsDTO";
import * as dto from '../model/class/DTO/eventPhotosDTOs';


export class EventPhotosController {

    constructor(private eventPhotosBusiness: EventPhotosBusiness) { }

    public eventPhotoRegister = async (req: Request, res: Response) => {

        try {

            const token = req.headers.auth as string
            const inputToken = new AuthenticationTokenDTO(token)

            const { photoUrl } = req.body;
            const input = new dto.CreateEventPhotosInputDTO(photoUrl)

            const result = await this.eventPhotosBusiness.createEventPhotos(input, inputToken)

            res.status(201).send(result);

        } catch (error: any) {
            res.status(400).send(error.message)
        }
    };

    public getAllEventPhotos = async (req: Request, res: Response) => {

        try {

            const token = req.headers.auth as string
            const inputToken = new AuthenticationTokenDTO(token)

            const result = await this.eventPhotosBusiness.getAllPhotos(inputToken)

            res.status(201).send(result);

        } catch (error: any) {
            res.status(400).send(error.message)
        }
    };


}