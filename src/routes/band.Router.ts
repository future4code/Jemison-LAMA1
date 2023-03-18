import { ShowDatabase } from './../data/showDatabase';
import { Authenticator } from './../services/authenticator';
import express from "express";
import BandBusiness from "../business/BandBusiness";
import { BandDatabase } from "../data/bandDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { BandController } from "../controller/bandController"

export const bandRouter = express.Router();

const bandDatabase = new BandDatabase()
const showDatabase = new ShowDatabase()
const authenticator = new Authenticator()
const idGenerator = new IdGenerator()
const bandBusiness = new BandBusiness(bandDatabase,showDatabase, authenticator,idGenerator)
const bandController = new BandController(bandBusiness)

bandRouter.get('/details',(req,res)=> bandController.getBandDetails)

bandRouter.post("/register", (req, res) => bandController.bandRegister);
