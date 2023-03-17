import { WeekDayEnum } from "../../model/showClass"

export interface IShowHoursValidator{
   validate(weekDay: WeekDayEnum, startTime: number, endTime: number):Promise<boolean>
}