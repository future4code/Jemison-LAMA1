import { IdGenerator } from './../services/idGenerator';
import { IShowHoursValidator } from './repository/ishowHoursValidator';
import { WeekDayEnum, ShowClass } from './../model/showClass';
import { IAuthenticator } from './repository/iauthenticator';
import { AuthenticationTokenDTO } from './../model/class/DTO/authenticatonsDTO';
import { ShowRepository } from './repository/showRepository';
import { CustomError } from '../error/customError';
import { BandRepository } from './repository/bandRepository';
import * as dto from '../model/class/DTO/showDTOs';
import * as err from '../error/showCustomError'
import { RoleEnum } from '../model/class/userClass';



export class ShowBusiness {

    constructor(
        private showDatabase: ShowRepository,
        private authenticator: IAuthenticator,
        private bandDatabase: BandRepository,
        private idGenerator: IIdGenerator,
       private showDateValidator: IShowHoursValidator
    ) { }

    public createShow = async (input: dto.ShowCreateInputDTO, token: AuthenticationTokenDTO): Promise<void> => {

        try {
            const {role } = this.authenticator.getTokenData(token)

            if(role !== RoleEnum.ADMIN){
                throw new
            }
       
            let filtredWeekDay
       

            if (!input.getWeekday()) {
                throw new err.MissingWeekDay()
            }
            if (!input.getStartTime()) {
                throw new err.MissingStartTime()
            }
            if (!input.getEndTime()) {
                throw new err.MissingEndTime()
            }

            const bandExists = await this.bandDatabase.getBandById(input.getBandId())

            if(!bandExists){
                throw new err.BandIdNonExists()
            }

            if(input.getWeekday().toLowerCase() === WeekDayEnum.SEXTA.toString()){
                filtredWeekDay = WeekDayEnum.SEXTA
            }else if(input.getWeekday().toLowerCase() === WeekDayEnum.SABADO.toString() || input.getWeekday().toLowerCase() === 'sábado'){
                filtredWeekDay = WeekDayEnum.SABADO
            }else if(input.getWeekday().toLowerCase() === WeekDayEnum.DOMINGO.toString()){
                filtredWeekDay = WeekDayEnum.DOMINGO
            }else{
                throw new err.InvalidWeekDay()
            }

            const isHoursValid = await this.showDateValidator.validate( filtredWeekDay ,input.getStartTime(), input.getEndTime())

            if(isHoursValid){

               const id = this.idGenerator.generateId()

                const newShow = new ShowClass(
                    id,
                    filtredWeekDay,
                    input.getStartTime(),
                    input.getEndTime(),
                    bandExists.id
                )

                await this.showDatabase.insertShow(newShow)

                return CRIAR UMA DTO DE SAIDA
            }

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    };
}