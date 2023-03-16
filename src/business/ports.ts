import { AuthenticationDataDTO, AuthenticationTokenDTO } from "../model/class/DTO/authenticatonsDTO"

export interface IHashGenerator {
    generateHash(plainText: string): Promise<string>
    compareHash(plainText: string, hashText: string): Promise<boolean>
}

export interface IIdGenerator {
    generateId(): string
}

export interface IAuthenticator {
    generateToken(input: AuthenticationDataDTO): string
    getTokenData(token: AuthenticationTokenDTO): any
}