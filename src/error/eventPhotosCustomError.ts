import { CustomError } from "./customError";

export class MissingPhotoUrl extends CustomError{
    constructor(){
        super(422, 'Url da photo faltando.')
    }
}

export class PhotoAlreadyExisits extends CustomError{
    constructor(){
       super(404, 'Esta url da foto já foi postado anteriormente.')
   }
}
export class ProhibitedActionForThisRoleAccount extends CustomError{
    constructor(){
        super(403, 'Ação permitida apenas para contas de administradores.')
    }
}