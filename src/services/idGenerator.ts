import { v4 } from 'uuid'
import { IIdGenerator } from '../business/repository/ports'

export class IdGenerator implements IIdGenerator{
    public generateId = () => {
        return v4()
    }
}