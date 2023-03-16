import { CustomError } from "./customError";

export class MissingEmail extends CustomError {
    constructor() {
        super(422, "Falta email")
    }
}

export class MissingName extends CustomError {
    constructor() {
        super(422, "Falta nome")
    }
}

export class MissingPassword extends CustomError {
    constructor() {
        super(422, "Falta senha")
    }
}

export class InvalidRole extends CustomError {
    constructor() {
        super(422, "Tipo de conta admin ou normal")
    }
}

export class EmailAlreadyExists extends CustomError {
    constructor() {
        super(409, "Email já existe no banco de dados")
    }
}