import { CustomError } from "./customError";

export class MissingWeekDay extends CustomError{
    constructor(){
        super(422, 'Dia da semana faltando.')
    }
}
export class MissingStartTime extends CustomError{
    constructor(){
        super(422, 'Horário de início do Show faltando.')
    }
}
export class MissingEndTime extends CustomError{
    constructor(){
        super(422, 'Horário de términio do Show faltando.')
    }
}

export class IsNotANumber extends CustomError{
    constructor(){
        super(422, 'Os horários de início e fim do show, precisam ser números.')
    }
}

export class BandIdNonExists extends CustomError{
    constructor(){
        super(404, 'ID da banda não encontrada no banco de dados.')
    }
}

export class InvalidWeekDay extends CustomError{
    constructor(){
        super(422, 'O dia da semana dos shows, precisam ser alguma opção entre sexta, sábado ou domingo')
    }
}

export class WrongShowHour extends CustomError{
    constructor(){
        super(422, 'Horário inválido, os show só podem ser agendados das 08:00 às 23:00, o horário de início não pode ser menor que o horário final e só podem haver horários inteiros.')
    }
}

export class AlreadyOccupied extends CustomError{
     constructor(){
        super(404, 'Horário já ocupado na agenda deste dia.')
    }
}

export class ProhibitedActionForThisRoleAccount extends CustomError{
    constructor(){
        super(403, 'Ação permitida apenas para contas de administradores.')
    }
}

export class BandAlreadyHasAShow extends CustomError{
    constructor(){
       super(404, 'Esta banda já possui um show agendadado.')
   }
}

