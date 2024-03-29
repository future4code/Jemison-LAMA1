import { UserClass } from './../model/class/userClass';
import { UserRepository } from './repository/userRepository';
import { CustomError } from "../error/customError"
import * as dto from "../model/class/DTO/UserDTOs"
import * as err from '../error/userCustomError'
import { RoleEnum } from './../model/class/userClass';
import { AuthenticationDataDTO, AuthenticationTokenDTO } from '../model/class/DTO/authenticatonsDTO';
import { IAuthenticator, IHashGenerator, IIdGenerator, IValidateUserData } from './repository/ports';

export class UserBusiness {

    constructor(
        private userDatabase: UserRepository,
        private validateUserData: IValidateUserData,
        private idGenerator: IIdGenerator,
        private hashManager: IHashGenerator,
        private authenticator: IAuthenticator
    ) { }

    public createUser = async (input: dto.UserControllerInputDTO): Promise<any> => {
        try {

            let filteredRole

            if (!input.getEMail()) {
                throw new err.MissingEmail()
            }
            if (!input.getName()) {
                throw new err.MissingName()
            }
            if (!input.getPassword()) {
                throw new err.MissingPassword()
            }
            if (!input.getRole()) {
                filteredRole = RoleEnum.NORMAL
            } else if (input.getRole().toString().toLowerCase() === 'normal') {
                filteredRole = RoleEnum.NORMAL
            } else if (input.getRole().toString().toLowerCase() === 'admin') {
                filteredRole = RoleEnum.ADMIN
            } else {
                throw new err.InvalidRole()
            }

            const isEmailValid = this.validateUserData.emailValidator(input.getEMail())
            if (!isEmailValid) {
                throw new err.InvalidEmail()
            }

            const isPasswordValid = this.validateUserData.passwordValidator(input.getPassword())
            if (!isPasswordValid) {
                throw new err.InvalidPassword()
            }

            const emailExists = await this.userDatabase.emailExists(input.getEMail())
       
            if (emailExists !== undefined) {
                throw new err.EmailAlreadyExists()
            } else {
                const id: string = this.idGenerator.generateId()
                const hashPassword: string = await this.hashManager.generateHash(input.getPassword())

                const newUser = new UserClass(
                    id,
                    input.getName(),
                    input.getEMail(),
                    hashPassword,
                    filteredRole
                )
               
                await this.userDatabase.insertUser(newUser)

                const tokenInput = new AuthenticationDataDTO(
                    id,
                    input.getRole()
                )

                const token = this.authenticator.generateToken(tokenInput)

                const result = new dto.CreationUserReturnDTO(
                    "Usuário criado com sucesso",
                    newUser,
                    token
                )
                return result
            }
        } catch (error: any) {
            throw new CustomError(400, error.message)
        }
    };


}