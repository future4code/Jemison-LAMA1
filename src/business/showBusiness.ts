import { IAuthenticator, IIdGenerator, IShowHoursValidator } from './repository/ports';
import { WeekDayEnum, ShowClass } from '../model/class/showClass';
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
        private showHourValidator: IShowHoursValidator
    ) { }

    public createShow = async (input: dto.ShowCreateInputDTO, token: AuthenticationTokenDTO): Promise<dto.ReturnCreateShowDTO> => {

        try {
            const { role } = this.authenticator.getTokenData(token)

            if (role !== RoleEnum.ADMIN) {
                throw new err.ProhibitedActionForThisRoleAccount()
            }

            let filteredWeekDay


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

            if (bandExists === undefined) {
                throw new err.BandIdNonExists()
            }

            if (input.getWeekday().toLowerCase() === WeekDayEnum.SEXTA.toString()) {
                filteredWeekDay = WeekDayEnum.SEXTA
            } else if (input.getWeekday().toLowerCase() === WeekDayEnum.SABADO.toString() || input.getWeekday().toLowerCase() === 'sábado') {
                filteredWeekDay = WeekDayEnum.SABADO
            } else if (input.getWeekday().toLowerCase() === WeekDayEnum.DOMINGO.toString()) {
                filteredWeekDay = WeekDayEnum.DOMINGO
            } else {
                throw new err.InvalidWeekDay()
            }

            const isHoursValid = await this.showHourValidator.validate(filteredWeekDay, input.getStartTime(), input.getEndTime())

            if (isHoursValid) {

                const id = this.idGenerator.generateId()

                const newShow = new ShowClass(
                    id,
                    filteredWeekDay,
                    input.getStartTime(),
                    input.getEndTime(),
                    bandExists.id
                )

                await this.showDatabase.insertShow(newShow)

                const result = new dto.ReturnCreateShowDTO('Show criado com sucesso.')

                return result
            }

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    };

    public getShowByWeekDay = async (input: dto.showGetByWeekDayDTO, inputToken: AuthenticationTokenDTO): Promise<dto.ReturnGetShowByDTO[] | undefined> => {
        try {
            this.authenticator.getTokenData(inputToken)

            if (!input.getWeekDay()) {
                throw new err.MissingWeekDay()
            }

            let filteredWeekDay

            if (input.getWeekDay().toLowerCase() === WeekDayEnum.SEXTA.toString()) {
                filteredWeekDay = WeekDayEnum.SEXTA
            } else if (input.getWeekDay().toLowerCase() === WeekDayEnum.SABADO.toString() || input.getWeekDay().toLowerCase() === 'sábado') {
                filteredWeekDay = WeekDayEnum.SABADO
            } else if (input.getWeekDay().toLowerCase() === WeekDayEnum.DOMINGO.toString()) {
                filteredWeekDay = WeekDayEnum.DOMINGO
            } else {
                throw new err.InvalidWeekDay()
            }

            const result = await this.showDatabase.getShowByWeekDay(filteredWeekDay)
            return result

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }

    };

    
}