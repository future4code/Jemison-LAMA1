import { RoleEnum } from './../model/class/userClass';
import { AuthenticationDataDTO, AuthenticationTokenDTO, PayloadDataDTO } from '../model/class/DTO/authenticatonsDTO';
import { Unauthorized } from '../error/customError';
import * as jwt from 'jsonwebtoken'
import { IAuthenticator } from '../business/ports';


export class Authenticator implements IAuthenticator{

public generateToken = (input: AuthenticationDataDTO): string => {

        const token = jwt.sign(
            {id: input.getId(), role: input.getRole() },
            process.env.JWT_KEY as string,
            { expiresIn: "24h" }
        )
        return token
    }

    getTokenData = (token: AuthenticationTokenDTO):PayloadDataDTO => {
        try {
            const payload = jwt.verify(token.getToken(), process.env.JWT_KEY as string) as {id:string, role:RoleEnum}
            return payload
        } catch (error: any) {
            console.log(error.message)
            throw new Unauthorized()
        }
    }

}