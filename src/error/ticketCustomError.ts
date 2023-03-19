import { CustomError } from "./customError";

export class MissingTitle extends CustomError{
    constructor(){
        super(422, 'Título do ingresso faltando.')
    }
}

export class MissingShowId extends CustomError{
    constructor(){
        super(422, 'ID do show referente ao ingresso faltando.')
    }
}

export class MissingPrice extends CustomError{
    constructor(){
        super(422, 'Valor do ingresso faltando.')
    }
}

export class MissingTotalTickets extends CustomError{
    constructor(){
        super(422, 'Total de ingressos disponíveis faltando.')
    }
}

export class TicketTitleAlreadyExists extends CustomError{
    constructor(){
        super(404, 'Título do ingresso já existe no banco de dados.')
    }
}

export class ShowIdNonExists extends CustomError{
    constructor(){
        super(404, 'ID do show não encontrado no banco de dados.')
    }
}

export class IsNotNumber extends CustomError{
    constructor(){
        super(422, 'O valor do ingresso e o total de ingressos precisam ser números.')
    }
}

export class ProhibitedActionForThisRoleAccount extends CustomError{
    constructor(){
        super(403, 'Ação permitida apenas para contas de administradores.')
    }
}