
export class TicketClass {
    constructor(
        private id: string,
        private title: string,
        private show_id_fk: string,
        private price: number,
        private total_tickets: number,
        private sold: number
    ) { }

    public getId() {
        return this.id
    }
    public setId(newId: string) {
        this.id = newId
    }

    public getTitle() {
        return this.title
    }
    public setTitle(newTitle: string) {
        this.title = newTitle
    }

    public getShowId() {
        return this.show_id_fk
    }
    public setShowId(newShowId: string) {
        this.show_id_fk = newShowId
    }

    public getPrice() {
        return this.price
    }
    public setPrice(newPrice: number) {
        this.price = newPrice
    }

    public getTotalTickets() {
        return this.total_tickets
    }
    public setTotalTickets(newTotalTickets: number) {
        this.total_tickets = newTotalTickets
    }

    public getSold() {
        return this.sold
    }
    public setSold(newSold:number) {
        this.sold = newSold
    }
}