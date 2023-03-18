import { TicketClass } from '../../model/class/ticketClass';
import * as dto from '../../model/class/DTO/ticketDTOs';


export interface TicketRepository {
    insertTicket(ticket: TicketClass): Promise<void>
    getTicketByName(ticketName: string): Promise<dto.ReturnGetTicketByNameDTO>
}