
export class TicketSalesCreateInput{
    constructor(
        private ticketId:string,
        private quantity:number
    ){}

    public getTicketId(){
        return this.ticketId
    }

    public getQuantity(){
        return this.quantity
    }
}

export class ReturnCreateTicketSalesDTO {
    constructor(
        public message: string
    ) { }
}