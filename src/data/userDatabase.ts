import { UserRepository } from './../business/repository/userRepository';
import { CustomError } from "../error/customError"
import { UserClass } from "../model/class/userClass"
import { BaseDatabase } from "./baseDatabase"
import { TABLE_USERS } from "./tableNames"

export class UserDatabase extends BaseDatabase implements UserRepository{

    TABLE_NAME = TABLE_USERS

    public insertUser = async (user: UserClass): Promise<void> => {
        try{
            await super.CreateItem(user)
        } catch (error: any) {
            throw new CustomError(400, error.message)
        }
    }
    public emailExists = async (email: string): Promise<any> => {
        try {

            const result = await UserDatabase.connection(this.TABLE_NAME).where('email', email)
            return result[0]

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };
}