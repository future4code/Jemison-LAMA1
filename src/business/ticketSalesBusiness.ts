import { TicketSalesClass } from './../model/class/ticketSalesClass';
import { AuthenticationTokenDTO } from './../model/class/DTO/authenticatonsDTO';
import { IAuthenticator, IIdGenerator } from './repository/ports';
import { TicketRepository } from './repository/ticketRepository';
import { TicketSalesRepository } from './repository/ticketSalesRepository';
import { CustomError } from '../error/customError';
import * as dto from '../model/class/DTO/ticketSalesDTOs';
import * as err from '../error/ticketSalesCustomError';


export class TicketSalesBusiness {
    constructor(
        private ticketSalesDatabase: TicketSalesRepository,
        private authenticator: IAuthenticator,
        private ticketDatabase: TicketRepository,
        private idGenerator: IIdGenerator,
    ) { }

    public creatTicketSales = async (input: dto.TicketSalesCreateInput, token: AuthenticationTokenDTO): Promise<dto.ReturnCreateTicketSalesDTO> => {
        try {
            const { id } = this.authenticator.getTokenData(token)

            if (!input.getTicketId()) {
                throw new err.MissingTicketId()
            }
            if (!input.getQuantity()) {
                throw new err.Missingquantity()
            }

            if (typeof (input.getQuantity()) !== 'number') {
                throw new err.IsNotNumber()
            }
            const ticketExists = await this.ticketDatabase.getTicketById(input.getTicketId())

            if (ticketExists === undefined) {
                throw new err.InvalidTicketId()
            } else if ((ticketExists.sold + input.getQuantity()) > ticketExists.total_tickets) {
                throw new err.InvalidTicketsQuantity()
            } else {
                const ticketSaleId = this.idGenerator.generateId()

                const newTicketSale = new TicketSalesClass(
                    ticketSaleId,
                    id,
                    input.getTicketId(),
                    input.getQuantity()
                )

                await this.ticketSalesDatabase.insertTicketSale(newTicketSale)

                const newTotalSoldTickets = ticketExists.sold + input.getQuantity()
                await this.ticketDatabase.updateTicketsSoldQuantity(ticketExists.id, newTotalSoldTickets)

                const result = new dto.ReturnCreateTicketSalesDTO('Venda de ingresso criada com sucesso')
                return result
            }


        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)

        };
    }
}