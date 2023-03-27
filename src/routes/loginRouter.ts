import { Authenticator } from './../services/authenticator';
import { HashManager } from './../services/hashsManger';
import express from 'express'
import { LoginBusiness } from '../business/loginBusiness'
import { LoginController } from '../controller/loginController'
import { UserDatabase } from '../data/userDatabase'


export const loginRouter = express.Router()

const userDatabase = new UserDatabase()
const hashManager = new HashManager()
const authenticator = new Authenticator()
const loginBusiness = new LoginBusiness(userDatabase, hashManager, authenticator)
const loginController = new LoginController(loginBusiness)

loginRouter.post('/login',(req, res) => loginController.login(req, res))