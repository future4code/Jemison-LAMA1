import express from 'express';
import { UserBusiness } from '../business/userBusiness';
import { UserController } from '../controller/userController';
import { UserDatabase } from '../data/userDatabase';
import { Authenticator } from '../services/authenticator';
import { HashManager } from '../services/hashsManger';
import { IdGenerator } from '../services/idGenerator';
import { ValidateUserData } from '../services/validateUserData';


export const userRouter = express.Router()

const userDatabase = new UserDatabase()
const userBusiness = new UserBusiness(userDatabase, new ValidateUserData, new IdGenerator(), new HashManager(), new Authenticator())
const userController = new UserController(userBusiness)

userRouter.post('/create', (req, res) => userController.creatUsers(req, res))
