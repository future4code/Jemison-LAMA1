import { ReturnGetShowByWeekDTO } from './../model/class/DTO/showDTOs';
import { ShowClass, WeekDayEnum } from './../model/showClass';
import { TABLE_SHOWS, TABLE_BANDS } from './tableNames';
import { BaseDatabase } from "./baseDatabase";
import { ShowRepository } from '../business/repository/showRepository';
import { CustomError } from '../error/customError';


export class ShowDatabase extends BaseDatabase implements ShowRepository {

    TABLE_NAME = TABLE_SHOWS

    public insertShow = async (show: ShowClass): Promise<void> => {

        try {

           await ShowDatabase.connection(this.TABLE_NAME).insert(show)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

    public getShowByWeekDay = async (weekDay: WeekDayEnum): Promise<ReturnGetShowByWeekDTO[] | undefined> => {

        try {

           const result = await ShowDatabase.connection.raw(`
                SELECT s.id AS "showId", s.week_day AS "weekDay", s.start_time AS "startTime", 
                s.end_time AS "endTime", s.band_id_fk AS "bandId", b.name AS "bandName"
                FROM ${this.TABLE_NAME} r
                INNER JOIN ${TABLE_BANDS} b ON b.id = s.band_id_fk
                WHERE s.week_day = "${weekDay}"
            `)
            return result[0]
        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };


}