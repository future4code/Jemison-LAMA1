import { TicketSalesClass } from "../../model/class/ticketSalesClass"

export interface TicketSalesRepository {
    insertTicketSale(ticketSale: TicketSalesClass): Promise<void>
}