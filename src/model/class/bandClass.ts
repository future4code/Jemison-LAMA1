export class BandClass {
    constructor(
        private id: string,
        private name: string,
        private music_genre: string,
        private responsible: string,
        ) { }
    public getId() {
        return this.id
    }
    public setId(newId: string) {
        this.id = newId
    }

    public getName() {
        return this.name
    }
    public setName(newName: string) {
        this.name = newName
    }

    public getMusicGenre() {
        return this.music_genre
    }
    public setMusicGenre(newMusicGenre: string) {
        this.music_genre = newMusicGenre
    }

    public getResponsible() {
        return this.responsible
    }
    public setResponsible(newResponsible: string) {
        this.responsible = newResponsible
    }
}