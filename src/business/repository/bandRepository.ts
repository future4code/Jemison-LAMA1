
export interface BandRepository{
getBandById(bandId:string):Promise<any>
}