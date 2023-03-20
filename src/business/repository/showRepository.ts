import { ShowClass, WeekDayEnum } from "../../model/class/showClass";
import * as dto from '../../model/class/DTO/showDTOs';

export interface ShowRepository {
    insertShow(show:ShowClass):Promise<void>

    getShowByWeekDay(weekDay:WeekDayEnum):Promise<dto.ReturnGetShowByDTO[] | undefined>
    getBandShow(bandId: string): Promise<dto.ReturnShowByBandDTO[] | undefined>
    getShowById(showId:string): Promise<dto.ReturnGetShowByDTO[] | undefined>
}