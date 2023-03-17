import { AuthenticationDataDTO, AuthenticationTokenDTO, PayloadDataDTO } from "../../model/class/DTO/authenticatonsDTO"

export interface IAuthenticator{

    generateToken(input: AuthenticationDataDTO): string
    getTokenData(token: AuthenticationTokenDTO):PayloadDataDTO
} 