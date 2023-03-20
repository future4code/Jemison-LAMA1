import { BandController } from './../controller/bandController';
import { Authenticator } from './../services/authenticator';
import { ShowDatabase } from './../data/showDatabase';
import { BandDatabase } from './../data/bandDatabase';
import { BandBusiness } from './../business/bandBusiness';
import express from 'express';
import { IdGenerator } from '../services/idGenerator';


export const bandRouter = express.Router();

const bandDataBase = new BandDatabase();
const showDatabase = new ShowDatabase();
const autheticator = new Authenticator();
const idGenerator = new IdGenerator();

const bandBusiness = new BandBusiness(bandDataBase, showDatabase, autheticator, idGenerator);
const bandController = new BandController(bandBusiness)

bandRouter.get('/details',(req,res)=> bandController.getBandDetails(req, res))

bandRouter.post("/register", (req, res) => bandController.bandRegister(req, res));
