import { Request, Response } from "express";
import { UserBusiness } from "../business/userBusiness";
import * as dto from "../model/class/DTO/UserDTOs"

export class UserController {

    constructor(private userBussiness: UserBusiness) {}

    public creatUsers = async (req: Request, res: Response): Promise<void> => {
        try{
            const { name, email, password, role } = req.body

            const input = new dto.UserControllerInputDTO(
                name,
                email,
                password,
                role
            )

            const result = await this.userBussiness.createUser(input)
            res.status(200).send(result)

        } catch (error: any) {
            res.status(400).send(error.message)
        }
    };
 }

