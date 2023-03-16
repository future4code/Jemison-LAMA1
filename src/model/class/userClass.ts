
// export enum RoleEnum{
//     NORMAL = 'normal',
//     ADMIN = 'admin'
// }

import { RoleEnum } from "../roleENUM";

export class UserClass {
    constructor (
        private id: string,
        private email: string,
        private name: string,
        private password: string,
        private role: RoleEnum
    ) {}
    public getId() {
        return this.id
    }
    public getEmail() {
        return this.email
    }
    public getName() {
        return this.name
    }
    public getPassword() {
        return this.password
    }
    public getROle() {
        return this.role
    }
}