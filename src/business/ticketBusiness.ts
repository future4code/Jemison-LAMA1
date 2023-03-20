import { TicketClass } from './../model/class/ticketClass';
import { TicketRepository } from './repository/ticketRepository';
import { AuthenticationTokenDTO } from '../model/class/DTO/authenticatonsDTO';
import { CustomError } from '../error/customError';
import { RoleEnum } from '../model/class/userClass';
import { IAuthenticator, IIdGenerator } from './repository/ports';
import * as dto from '../model/class/DTO/ticketDTOs';
import * as err from '../error/ticketCustomError'
import { ShowRepository } from './repository/showRepository';

export class TicketBusiness {
    constructor(
        private ticketDatabase: TicketRepository,
        private showDatabase: ShowRepository,
        private idGenerator: IIdGenerator,
        private authenticator: IAuthenticator
    ) { }

    public createTicket = async (input: dto.TicketCreateInputDTO, token: AuthenticationTokenDTO): Promise<dto.ReturnCreateTicketDTO> => {

        try {

            const { role } = this.authenticator.getTokenData(token)

            if (role !== RoleEnum.ADMIN) {
                throw new err.ProhibitedActionForThisRoleAccount()
            }

            if (!input.getTitle()) {
                throw new err.MissingTitle()
            }
            if (!input.getShowId()) {
                throw new err.MissingShowId()
            }
            if (!input.getPrice()) {
                throw new err.MissingPrice()
            }
            if (!input.getTotalTickets()) {
                throw new err.MissingTotalTickets()
            }

            if (typeof (input.getPrice()) !== 'number' || typeof (input.getTotalTickets()) !== 'number') {
                throw new err.IsNotNumber()
            }

            const titleExists = await this.ticketDatabase.getTicketByName(input.getTitle())
            if (titleExists !== undefined) {
                throw new err.TicketTitleAlreadyExists()
            } else {
                const showExists = await this.showDatabase.getShowById(input.getShowId())
              if (showExists.length === 0) {
                    throw new err.ShowIdNonExists()
                } else {

                    const id = this.idGenerator.generateId()

                    const newTicket = new TicketClass(
                        id,
                        input.getTitle(),
                        input.getShowId(),
                        input.getPrice(),
                        input.getTotalTickets(),
                        0
                    )

                    await this.ticketDatabase.insertTicket(newTicket)

                    const result = new dto.ReturnCreateTicketDTO('Ticket criado com sucesso.')

                    return result
                }
            }
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }

    };

}