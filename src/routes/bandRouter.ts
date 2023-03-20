import { BandController } from './../controller/bandController';
import { BandBusiness } from './../business/bandBusiness';
import { IdGenerator } from './../services/idGenerator';
import { Authenticator } from './../services/authenticator';
import { ShowDatabase } from './../data/showDatabase';
import { BandDatabase } from './../data/bandDatabase';
import express from 'express'

export const bandRouter = express.Router();

const bandDatabase = new BandDatabase();
const showDatabase = new ShowDatabase();
const authenticator = new Authenticator();
const idGenerator = new IdGenerator();

const bandBusiness = new BandBusiness(bandDatabase, showDatabase, authenticator, idGenerator)
const bandController = new BandController(bandBusiness)

bandRouter.get('/details',(req,res)=> bandController.getBandDetails(req, res))

bandRouter.post("/register", (req, res) => bandController.bandRegister(req, res));