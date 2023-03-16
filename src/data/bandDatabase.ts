import { BandClass } from "../model/class/bandClass";
import { BaseDatabase } from "./baseDatabase";
import { TABLE_BANDS } from "./tableNames";

export class BandDatabase extends BaseDatabase{

    TABLE_NAME = TABLE_BANDS

    public async createBand(band:BandClass){

        try{
            await super.CreateItem(band)
        }catch(error:any){
            throw new Error(error.message)
        }
    }
}