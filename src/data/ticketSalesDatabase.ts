import { TicketSalesClass } from './../model/class/ticketSalesClass';
import { TABLE_TICKET_SALES } from './tableNames';
import { TicketSalesRepository } from "../business/repository/ticketSalesRepository";
import { CustomError } from '../error/customError';
import { BaseDatabase } from "./baseDatabase";


export class TicketSalesDatabase extends BaseDatabase implements TicketSalesRepository {

    TABLE_NAME = TABLE_TICKET_SALES

    public insertTicketSale = async (ticketSale: TicketSalesClass): Promise<void> => {

        try {

            await TicketSalesDatabase.connection(this.TABLE_NAME).insert(ticketSale)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };
}