import { CustomError } from "./customError";

export class MissingTicketId extends CustomError {
    constructor() {
        super(422, "ID do ingresso faltando.")
    }
}

export class Missingquantity extends CustomError {
    constructor() {
        super(422, "quantidade de ingressos faltando.")
    }
}

export class IsNotNumber extends CustomError{
    constructor(){
        super(422, 'A quantidade de ingressos precisa ser um número.')
    }
}

export class InvalidTicketsQuantity extends CustomError {
    constructor() {
        super(404, "A quantidade de ingressos da compra é maior que a quantidade de ingressos disponíveis banco de dados.")
    }
}

export class InvalidTicketId extends CustomError {
    constructor() {
        super(404, "Id do ingresso não encontrado no banco de dados.")
    }
}