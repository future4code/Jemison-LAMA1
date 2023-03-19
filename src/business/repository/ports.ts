import { AuthenticationDataDTO, AuthenticationTokenDTO, PayloadDataDTO } from "../../model/class/DTO/authenticatonsDTO"
import { WeekDayEnum } from "../../model/class/showClass"

export interface IHashGenerator {
    generateHash(plainText: string): Promise<string>
    compareHash(plainText: string, hashText: string): Promise<boolean>
}

export interface IIdGenerator {
    generateId(): string
}

export interface IAuthenticator {
    generateToken(input: AuthenticationDataDTO): string
    getTokenData(token: AuthenticationTokenDTO): PayloadDataDTO
}


export interface IShowHoursValidator {
    validate(weekDay: WeekDayEnum, startTime: number, endTime: number): Promise<boolean>
}

export interface IValidateUserData {
    emailValidator(email: string): Boolean
    passwordValidator(password: string): Boolean
}

