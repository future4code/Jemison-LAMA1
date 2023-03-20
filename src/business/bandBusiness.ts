import { BandClass } from "../model/class/bandClass";
import { BandInputDTO } from "../model/class/DTO/bandDTOs";
import { AuthenticationTokenDTO } from "../model/class/DTO/authenticatonsDTO";
import { BandRepository } from "./repository/bandRepository";
import { IAuthenticator, IIdGenerator } from "./repository/ports";
import { RoleEnum } from "../model/class/userClass";
import * as err from '../error/bandCustomError';
import * as dto from '../model/class/DTO/bandDTOs'
import { ShowRepository } from './repository/showRepository';
import { ReturnShowByBandDTO } from '../model/class/DTO/showDTOs';

export class BandsBusiness {
    constructor(
        private bandDatabase: BandRepository,
        private showDatabase: ShowRepository,
        private authenticator: IAuthenticator,
        private idGenerator: IIdGenerator
    ) { }

    public bandRegister = async (input: BandInputDTO, token: AuthenticationTokenDTO): Promise<dto.ReturnCreateBandDTO> => {
        try {
            const { role } = this.authenticator.getTokenData(token)

            if (role !== RoleEnum.ADMIN) {
                throw new err.ProhibitedActionForThisRoleAccount()
            }


            if (!input.getName()) {
                throw new err.MissingBandName()
            }
            if (!input.getMusicGenre()) {
                throw new err.MissingBandGenre
            }
            if (!input.getResponsible()) {
                throw new err.MissingBandResponsible
            }

            const bandNameExists = await this.bandDatabase.getBandByName(input.getName())

            if (bandNameExists !== undefined) {
                throw new err.BandNameAlreadyExists()
            } else {
                const id = this.idGenerator.generateId();

                const newBand = new BandClass(
                    id,
                    input.getName(),
                    input.getMusicGenre(),
                    input.getResponsible()
                );

                await this.bandDatabase.createBand(newBand);

                const result = new dto.ReturnCreateBandDTO('Banda criada com sucesso.')

                return result

            }

        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    public getBandDetails = async (input: dto.GetBandDetailsInputDTO, token: AuthenticationTokenDTO): Promise<ReturnShowByBandDTO[] | dto.ReturnGetBandDTO> => {
        try {

            this.authenticator.getTokenData(token)

            let result

            if (!input.getBandIdOrName()) {
                throw new err.MissingBandIdOrName
            } else {

                const isInputId = await this.bandDatabase.getBandById(input.getBandIdOrName())

                if (isInputId) {
                    result = await this.showDatabase.getBandShow(isInputId.id)
                    if(result.length === 0){
                        result = isInputId
                    }

                } else {
                    const isInputName = await this.bandDatabase.getBandByName(input.getBandIdOrName())
                    if (isInputName) {
                        result = await this.showDatabase.getBandShow(isInputName.id)
                        if(result.length === 0){
                            result = isInputName
                        }
                    } else {
                        throw new err.InvalidIdOrName()
                    }
                }
                return result
            }

        } catch (error: any) {
            throw new Error(error.message);
        }

    }
}