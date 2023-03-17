import { UserClass } from './../model/class/userClass';
import { UserRepository } from './repository/userRepository';
import { CustomError } from "../error/customError"
import * as dto from "../model/class/DTO/UserDTOs"
import * as err from '../error/userCustomError'
import { RoleEnum } from "../model/class/userClass"
import { AuthenticationDataDTO, AuthenticationTokenDTO } from '../model/class/DTO/authenticatonsDTO';
import { IAuthenticator, IHashGenerator, IIdGenerator } from './ports';

export class UserBusiness {

    constructor(
        private userDatabase: UserRepository,
        private idGenerator: IIdGenerator,
        private hashManager: IHashGenerator,
        private authenticator: IAuthenticator
        ){}

    public createUser = async (input: dto.UserControllerInputDTO): Promise<any> => {
        try{

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

            const emailExists = await this.userDatabase.emailExists(input.getEMail())

            if(emailExists !== undefined) {
                throw new err.EmailAlreadyExists()
            } else {
                const id: string = this.idGenerator.generateId()
                const hashPassword: string = await this.hashManager.generateHash(input.getPassword())

                const newUser = new UserClass(
                    id,
                    input.getEMail(),
                    input.getName(),
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
    }
    public getUserProfile = async (userId: dto.GetUserProfileInputDTO, input: AuthenticationTokenDTO): Promise<dto.CreationUserReturnDTO> => {
        try {
            const {id} = this.authenticator.getTokenData(input)

            if(userId.getUserId() === id) {
                throw new err.UserIdEqualYourOwnID
            }

            const result = await this.userDatabase.getUserById(userId.getUserId())

            if (result.lenth === 0) {
                throw new err.InvalidUser
            } else {
                return result
            }

        } catch (error: any) {
            throw new CustomError(400, error.message)
        }
    }

}