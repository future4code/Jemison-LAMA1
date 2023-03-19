import { EventPhotosClass } from "../../model/class/EventPhotosClass";
import * as dto from '../../model/class/DTO/eventPhotosDTOs';

export interface EventPhotosRepository {
    createEventPhoto(eventPhoto: EventPhotosClass): Promise<void>
    getPhotoByUrl(photoUrl: string): Promise<dto.ReturnGetPhotoDTO | undefined>
    getAllPhotos(): Promise<dto.ReturnGetPhotoDTO[] | undefined>
}