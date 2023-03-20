import { TABLE_TICKETS } from './tableNames';
import { BaseDatabase } from "./baseDatabase";
import { TicketRepository } from '../business/repository/ticketRepository';
import { TicketClass } from '../model/class/ticketClass';
import { CustomError } from '../error/customError';
import * as dto from '../model/class/DTO/ticketDTOs'


export class TicketDatabase extends BaseDatabase implements TicketRepository {

    TABLE_NAME = TABLE_TICKETS

    public insertTicket = async (ticket: TicketClass): Promise<void> => {

        try {

            await TicketDatabase.connection(this.TABLE_NAME).insert(ticket)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

    public getTicketByName = async (ticketName: string): Promise<dto.ReturnGetTicketByNameDTO | undefined> => {

        try {

            const result = await TicketDatabase.connection(this.TABLE_NAME).where('title', ticketName)
            return result[0]

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

    public getTicketById = async (ticketId: string): Promise<dto.ReturnGetTicketByNameDTO | undefined> => {

        try {

            const result = await TicketDatabase.connection(this.TABLE_NAME).where('id', ticketId)
            return result[0]

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

    public updateTicketsSoldQuantity = async (ticketId: string, newSoldQuantity: number): Promise<void> => {
        try {

            await TicketDatabase.connection(this.TABLE_NAME).where('id', ticketId).update('sold', newSoldQuantity)


        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };
}

