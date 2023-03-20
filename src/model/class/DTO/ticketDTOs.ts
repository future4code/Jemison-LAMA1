
export class TicketCreateInputDTO {
    constructor(
        private title: string,
        private showId: string,
        private price: number,
        private totalTickets: number
    ) { }

    public getTitle() {
        return this.title
    }
    public getShowId() {
        return this.showId
    }
    public getPrice() {
        return this.price
    }
    public getTotalTickets() {
        return this.totalTickets
    }
}

export class ReturnCreateTicketDTO {
    constructor(
        public message: string
    ) { }
}

export class ReturnGetTicketByNameDTO {
    constructor(
        public id: string,
        public title: string,
        public show_id_fk: string,
        public price: number,
        public total_tickets: number,
        public sold: number
    ) { }
}
