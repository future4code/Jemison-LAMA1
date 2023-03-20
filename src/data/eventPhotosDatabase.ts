import { TABLE_EVENT_PHOTOS, TABLE_USERS } from './tableNames';
import { EventPhotosRepository } from './../business/repository/eventPhotosRepository';
import { BaseDatabase } from './baseDatabase';
import { EventPhotosClass } from '../model/class/EventPhotosClass';
import { CustomError } from '../error/customError';
import * as dto from '../model/class/DTO/eventPhotosDTOs'


export class EventPhotosDatabase extends BaseDatabase implements EventPhotosRepository{

    TABLE_NAME = TABLE_EVENT_PHOTOS

    public createEventPhoto = async (eventPhoto: EventPhotosClass): Promise<void> => {

        try {
            await EventPhotosDatabase.connection(this.TABLE_NAME).insert(eventPhoto)
        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }; 

    public getPhotoByUrl = async (photoUrl:string): Promise<dto.ReturnGetPhotoDTO[] | undefined> => {

        try {
           const result = await EventPhotosDatabase.connection.raw(`
                SELECT p.id AS "photoId", p.user_id_fk AS "userId", u.name AS "userName",
                p.photo_url AS "photoUrl", p.post_date AS "postTime"
                FROM ${this.TABLE_NAME} p
                INNER JOIN ${TABLE_USERS} u ON u.id = p.user_id_fk
                WHERE p.photo_url = "${photoUrl}"
           `)
           return result[0]

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };    

    public getAllPhotos = async (): Promise<dto.ReturnGetPhotoDTO[] | undefined> => {

        try {
           const result = await EventPhotosDatabase.connection.raw(`
                SELECT p.id AS "photoId", p.user_id_fk AS "userId", u.name AS "userName",
                p.photo_url AS "photoUrl", p.post_date AS "postTime"
                FROM ${this.TABLE_NAME} p
                INNER JOIN ${TABLE_USERS} u ON u.id = p.user_id_fk
                ORDER BY p.post_date
           `)
           return result[0]
           
        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };    
}