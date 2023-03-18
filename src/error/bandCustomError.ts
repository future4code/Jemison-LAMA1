import { CustomError } from "./customError";

export class MissingBandName extends CustomError{
    constructor(){
        super(422, 'Nome da banda faltando.')
    }
}
export class MissingBandGenre extends CustomError{
    constructor(){
        super(422, 'Gênero musical da banda faltando.')
    }
}
export class MissingBandResponsible extends CustomError{
    constructor(){
        super(422, 'Nome do responsável pela banda faltando.')
    }
}

export class MissingBandIdOrName extends CustomError{
    constructor(){
        super(422, 'Nome ou ID da banda faltando.')
    }
}

export class ProhibitedActionForThisRoleAccount extends CustomError{
    constructor(){
        super(403, 'Ação permitida apenas para contas de administradores.')
    }
}

export class BandNameAlreadyExists extends CustomError {
    constructor() {
        super(409, "Já existe uma banda com este nome no banco de dados")
    }
}

export class BandAlreadyHasAShow extends CustomError{
    constructor(){
       super(404, 'Esta banda já possui um show agendadado.')
   }
}

export class InvalidIdOrName extends CustomError {
    constructor() {
        super(404, "ID ou o nome da banda não encontrados no banco de dados.")
    }
}

