import { RoleEnum } from "../userClass";
import { UserClass } from "../userClass";

export class UserControllerInputDTO {
    constructor(
        private email: string,
        private name: string,
        private password: string,
        private role: RoleEnum
    ) {}

    public getEMail() {
        return this.email
    }
    public getName() {
        return this.name
    }
    public getPassword() {
        return this.password
    }
    public getRole() {
        return this.role
    }
}

export class CreationUserReturnDTO {
    constructor(
        private message: string,
        private user: UserClass,
        private token: string
    ) {}

    public getMessage() {
        return this.message
    }
    public getUser() {
        return this.user
    }
    public getToken() {
        return this.token
    }
}