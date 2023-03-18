import { UserRepository } from "./repository/userRepository";
import { AuthenticationTokenDTO, AuthenticationDataDTO } from "../model/class/DTO/authenticatonsDTO";
import { CustomError } from "../error/customError";
import * as dto from '../model/class/DTO/loginDTOs'
import * as err from '../error/loginCustomError'
import { IAuthenticator, IHashGenerator } from "./ports";


export class LoginBusiness {

    constructor(
        private userDatabase: UserRepository,
        private hashManager : IHashGenerator,
        private authenticator: IAuthenticator,
        ) { }


    public login = async (input: dto.LoginInputDTO): Promise<AuthenticationTokenDTO> => {

        try {

            const emailExists = await this.userDatabase.emailExists(input.getEmail())

            if (emailExists === undefined) {
                throw new err.WrongEmail()
            }

  

            const comparePassword: boolean = await this.hashManager.compareHash(input.getPassword(), emailExists.password)
            if (!comparePassword) {
                throw new err.WrongPassword()
            } else {
          
                const input = new AuthenticationDataDTO(
                    emailExists.id,
                    emailExists.role
                )

                const token = this.authenticator.generateToken(input)
                const authenticationTokenDTO = new AuthenticationTokenDTO(token)

                return authenticationTokenDTO
            }

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };
}