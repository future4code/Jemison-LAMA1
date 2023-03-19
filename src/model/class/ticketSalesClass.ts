

export class TicketSalesClass{
    constructor(
private id:string,
private buyer_id:string,
private ticket_id_fk:string,
private quantity:number
    ){}

    public getId() {
        return this.id
    }
    public setId(newId: string) {
        this.id = newId
    }

    public getBuyerId() {
        return this.buyer_id
    }
    public setBuyerId(newBuyerId: string) {
        this.buyer_id = newBuyerId
    }

    public getTicketId() {
        return this.ticket_id_fk
    }
    public setTicketId(newTicketId: string) {
        this.ticket_id_fk = newTicketId
    }

    public getQuantity() {
        return this.quantity
    }
    public setQuantity(newQuantity: number) {
        this.quantity = newQuantity
    }

}