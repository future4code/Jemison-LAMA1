import { IValidateUserData } from "../business/repository/ports"

export class ValidateUserData implements IValidateUserData {
  
    public emailValidator = (email: string):Boolean => {
        return /\S+@\S+\.\S+/.test(email)
    }

    public passwordValidator = (password: string):Boolean => {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!?$*&@#])[0-9a-zA-Z$*!?&@#]{8,}$/.test(password)
    }

}
