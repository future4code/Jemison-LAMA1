import { BandClass } from "../../model/class/bandClass";
import * as dto from '../../model/class/DTO/bandDTOs';

export interface BandRepository {
    createBand(band: BandClass): Promise<void>
    getBandById(bandId: string): Promise<dto.ReturnGetBandDTO | undefined>
    getBandByName(bandName: string): Promise<dto.ReturnGetBandDTO | undefined>
}