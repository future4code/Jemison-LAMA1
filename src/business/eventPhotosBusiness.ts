import { EventPhotosClass } from './../model/class/EventPhotosClass';
import { AuthenticationTokenDTO } from './../model/class/DTO/authenticatonsDTO';
import { EventPhotosRepository } from './repository/eventPhotosRepository';
import { IAuthenticator, IIdGenerator } from './repository/ports';
import { UserRepository } from './repository/userRepository';
import { CustomError } from '../error/customError';
import * as dto from '../model/class/DTO/eventPhotosDTOs';
import * as err from '../error/eventPhotosCustomError'
import { RoleEnum } from '../model/class/userClass';


export class EventPhotosBusiness {

    constructor(
        private eventPhotosDatabase: EventPhotosRepository,
        private authenticator: IAuthenticator,
        private idGenerator: IIdGenerator
    ) { }


    public createEventPhotos = async (input: dto.CreateEventPhotosInputDTO, token: AuthenticationTokenDTO): Promise<dto.ReturnCreateEventPhotosDTO> => {

        try {

            const { id } = this.authenticator.getTokenData(token)

            if (!input.getPhotoUrl()) {
                throw new err.MissingPhotoUrl()
            }

            const photoUrlExists = await this.eventPhotosDatabase.getPhotoByUrl(input.getPhotoUrl())

            if (photoUrlExists.length > 0) {
                throw new err.PhotoAlreadyExisits()
            } else {

                const eventPhotoId = this.idGenerator.generateId()

                const newEventPhoto = new EventPhotosClass(
                    eventPhotoId,
                    id,
                    input.getPhotoUrl()
                )

                await this.eventPhotosDatabase.createEventPhoto(newEventPhoto)

                const result = new dto.ReturnCreateEventPhotosDTO('Foto enviada com sucesso.')
                return result
            }

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }

    };

    public getAllPhotos = async (token: AuthenticationTokenDTO): Promise<dto.ReturnGetPhotoDTO[]> => {

        try {

            const { role } = this.authenticator.getTokenData(token)

            if (role !== RoleEnum.ADMIN) {
                throw new err.ProhibitedActionForThisRoleAccount()
            }

            const result = await this.eventPhotosDatabase.getAllPhotos()

            return result


        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }

    };

}