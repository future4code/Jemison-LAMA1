
export class ShowCreateInputDTO{
    constructor(
        private weekDay:string,
        private startTime:number,
        private endTime:number,
        private bandId:string
    ){}

    public getWeekday(){
        return this.weekDay
    }
    public getStartTime(){
        return this.startTime
    }
    public getEndTime(){
        return this.endTime
    }
    public getBandId(){
        return this.bandId
    }
}

export class ReturnGetShowByWeekDTO{
    constructor(
        public showId:string,
        public weekDay:string,
        public startTime:number,
        public endTime:number,
        public bandId:string,
        public bandName:string
    ){}
}