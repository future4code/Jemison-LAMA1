export enum WeekDayEnum{
    SEXTA = 'sexta',
    SABADO = 'sabado',
    DOMINGO = 'domingo'
}

export class ShowClass {
    constructor(
        private id: string,
        private week_day: WeekDayEnum,
        private start_time: number,
        private end_time: number,
        private band_id_fk:string
        ) { }
    public getId() {
        return this.id
    }
    public setId(newId: string) {
        this.id = newId
    }

    public getWeekDay() {
        return this.week_day
    }
    public setWeekDay(newWeekDay: WeekDayEnum) {
        this.week_day = newWeekDay
    }

    public getStartTime(){
        return this.start_time
    }
    public setStartTime(newStartTime:number){
        this.start_time = newStartTime
    }

    public getEndTime(){
        return this.end_time
    }
    public setEndTime(newEndTime:number){
        this.end_time = newEndTime
    }

    public getBandId(){
        return this.band_id_fk
    }
    public setBandId(newBandId:string){
        this.band_id_fk = newBandId
    }

}