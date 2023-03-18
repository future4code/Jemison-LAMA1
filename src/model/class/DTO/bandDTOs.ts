
export class BandInputDTO {
    constructor(
        private name: string,
        private music_genre: string,
        private responsible: string
    ) { }

    public getName() {
        return this.name
    }
    public getMusicGenre() {
        return this.music_genre
    }
    public getResponsible() {
        return this.responsible
    }
}

export class ReturnCreateBandDTO {
    constructor(
        public message: string
    ) { }
}

export class ReturnGetBandDTO {
    constructor(
        public id: string,
        public name: string,
        public musicGenre: string,
        public responsible: string
    ) { }
}

export class GetBandDetailsInputDTO {
    constructor(
        private bandIdOrName: string
    ) { }

    public getBandIdOrName(){
        return this.bandIdOrName
    }
}
