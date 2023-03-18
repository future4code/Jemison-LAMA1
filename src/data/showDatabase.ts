import { ShowClass, WeekDayEnum } from './../model/showClass';
import { TABLE_SHOWS, TABLE_BANDS } from './tableNames';
import { BaseDatabase } from "./baseDatabase";
import { ShowRepository } from '../business/repository/showRepository';
import { CustomError } from '../error/customError';
import * as dto from '../model/class/DTO/showDTOs'


export class ShowDatabase extends BaseDatabase implements ShowRepository {

    TABLE_NAME = TABLE_SHOWS

    public insertShow = async (show: ShowClass): Promise<void> => {

        try {

            await ShowDatabase.connection(this.TABLE_NAME).insert(show)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

    public getShowByWeekDay = async (weekDay: WeekDayEnum): Promise<dto.ReturnGetShowByWeekDTO[] | undefined> => {

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

    public getBandShow = async (bandId: string): Promise<dto.ReturnShowsByBandDTO | undefined> => {
        try {
            const result = await ShowDatabase.connection.raw(`
                SELECT s.band_id_fk AS "bandId", b.name AS "bandName", b.music_genre AS "bandGenre",
                s.id AS "showId", s.week_day AS "showWeekDay", s.start_time AS "showStart", s.end_time AS "showEnd"
                FROM ${this.TABLE_NAME} s
                INNER JOIN ${TABLE_BANDS} b ON b.id = s.band_id_fk
                WHERE s.band_id_fk = "${bandId}";
        `)
            return result[0]

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }


}