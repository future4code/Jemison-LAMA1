import { CustomError } from "./customError";


export class WrongEmail extends CustomError {
    constructor() {
        super(404, "Email não cadastrado em nosso sistema.")
    }
}

export class WrongPassword extends CustomError {
    constructor() {
        super(404, 'Password inserido não combina com a conta do email digitado.')
    }
}