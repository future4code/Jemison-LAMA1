import { WeekDayEnum } from '../showClass';

export class ShowCreateInputDTO {
    constructor(
        private weekDay: string,
        private startTime: number,
        private endTime: number,
        private bandId: string
    ) { }

    public getWeekday() {
        return this.weekDay
    }
    public getStartTime() {
        return this.startTime
    }
    public getEndTime() {
        return this.endTime
    }
    public getBandId() {
        return this.bandId
    }
}

export class showGetByWeekDayDTO {
    constructor(
        private weekDay: string
    ) { }

    public getWeekDay() {
        return this.weekDay
    }
}

export class ReturnGetShowByDTO {
    constructor(
        public showId: string,
        public weekDay: string,
        public startTime: number,
        public endTime: number,
        public bandId: string,
        public bandName: string
    ) { }
}

export class ReturnCreateShowDTO {
    constructor(
        public message: string
    ) { }
}

export class ReturnShowByBandDTO {
    constructor(
        public bandId: string,
        public bandName: string,
        public bandGenre: string,
        public showId: string,
        public showWeekday: WeekDayEnum,
        public showStart: number,
        public showEnd: number,
    ) { }
}