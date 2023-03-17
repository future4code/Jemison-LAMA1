import { UserClass } from "../../model/class/userClass"

export interface UserRepository {
    emailExists(email: string): Promise<any>
    insertUser(user: UserClass): Promise<any>
    getUserById(id: string): Promise<any>
}