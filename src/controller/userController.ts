import { Request, Response } from "express";
import { UserBusiness } from "../business/userBusiness";
import { AuthenticationTokenDTO } from "../model/class/DTO/authenticatonsDTO";
import * as dto from "../model/class/DTO/UserDTOs"

export class UserController {

    constructor(private userBussiness: UserBusiness) {}

    public creatUsers = async (req: Request, res: Response): Promise<void> => {
        try{
            const { email, name, password, role } = req.body

            const input = new dto.UserControllerInputDTO(
                email,
                name,
                password,
                role
            )

            const result = await this.userBussiness.createUser(input)
            res.status(200).send(result)

        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }

    public getUserProfile = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.auth as string
            const input = new AuthenticationTokenDTO(token)            

            const id = req.params.userId
            const userId = new dto.GetUserProfileInputDTO(id)

            const result = await this.userBussiness.getUserProfile(userId, input)
            res.status(201).send(result)

        } catch (error: any) {
            res.status(400).send(error.message)
        }
 }}