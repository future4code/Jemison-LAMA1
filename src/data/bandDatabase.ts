import { BandRepository } from './../business/repository/bandRepository';
import { BandClass } from "../model/class/bandClass";
import { BaseDatabase } from "./baseDatabase";
import { TABLE_BANDS } from "./tableNames";
import { CustomError } from '../error/customError';
import * as dto from '../model/class/DTO/bandDTOs';


export class BandDatabase extends BaseDatabase implements BandRepository {

    TABLE_NAME = TABLE_BANDS

    public createBand = async (band: BandClass): Promise<void> => {

        try {
            await BandDatabase.connection(this.TABLE_NAME).insert(band)
        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

    public getBandById = async (bandId: string): Promise<dto.ReturnGetBandDTO| undefined> => {
        try {

            const result = await BandDatabase.connection(this.TABLE_NAME).where('id', bandId)
            return result[0]

        } catch (error: any) {
            throw new Error(error.message)
        }

    };

    public getBandByName = async (bandName: string): Promise<dto.ReturnGetBandDTO | undefined> => {
        try {

            const result = await BandDatabase.connection(this.TABLE_NAME).where('name', bandName)
            return result[0]

        } catch (error: any) {
            throw new Error(error.message)
        }

    };
}