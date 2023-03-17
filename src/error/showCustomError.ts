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
        super(422, 'Horário inválido, os show só podem ser agendados das 08:00 às 23:00 e apenas com horários inteiros.')
    }
}

export class AlreadyOccupied extends CustomError{
     constructor(){
        super(404, 'Horário já ocupado na agenda deste dia.')
    }
}