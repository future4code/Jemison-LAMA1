import { WeekDayEnum } from '../model/class/showClass';
import { ShowDatabase } from '../data/showDatabase';
import { IShowHoursValidator } from '../business/ports';
import { CustomError } from '../error/customError';
import * as err from '../error/showCustomError';

export class ShowHoursValidator implements IShowHoursValidator {

    public validate = async (weekDay: WeekDayEnum, startTime: number, endTime: number): Promise<boolean> => {
        try {
            const isDateInteger = Number.isInteger(startTime / endTime)
            if (!isDateInteger || startTime < 8 || startTime > 22 || endTime < 9 || endTime > 23) {
                throw new err.WrongShowHour()
            }
            if (startTime < endTime || startTime === endTime) {
                throw new err.WrongShowHour()
            }

            const showDatabase = new ShowDatabase()

            const showsOnDay = await showDatabase.getShowByWeekDay(weekDay)

            let validateHours

            showsOnDay.map((show) => {
                if (show.startTime == startTime) {
                    throw new err.AlreadyOccupied()
                } else if (startTime > show.startTime && startTime < show.endTime) {
                    throw new err.AlreadyOccupied
                } else if (startTime < show.startTime && endTime > show.startTime) {
                    throw new err.AlreadyOccupied
                } else {
                    validateHours = true
                }
            })

            return validateHours

        }
        catch (error: any) {
            throw new CustomError(400, error.message)
        }

    }
}