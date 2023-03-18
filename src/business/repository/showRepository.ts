import { ShowClass, WeekDayEnum } from "../../model/showClass";
import * as dto from '../../model/class/DTO/showDTOs';

export interface ShowRepository {
    insertShow(show:ShowClass):Promise<void>
    getShowByWeekDay(weekDay:WeekDayEnum):Promise<dto.ReturnGetShowByWeekDTO[] | undefined>
    getBandShow(bandId: string): Promise<dto.ReturnShowsByBandDTO | undefined>
}