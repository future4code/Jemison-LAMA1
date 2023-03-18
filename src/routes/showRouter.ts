import { ShowController } from './../controller/showController';
import { BandDatabase } from './../data/bandDatabase';
import { ShowBusiness } from './../business/showBusiness';
import { ShowDatabase } from './../data/showDatabase';
import express from 'express'
import { Authenticator } from '../services/authenticator';
import { IdGenerator } from '../services/idGenerator';
import { ShowHoursValidator } from '../services/showHoursValidator';

export const showRouter = express.Router()

const showDatabase = new ShowDatabase();
const authenticator = new Authenticator();
const bandDatabase = new BandDatabase();
const idGenerator = new IdGenerator();
const showHourValidator = new ShowHoursValidator()

const showBusiness = new ShowBusiness(showDatabase, authenticator, bandDatabase, idGenerator, showHourValidator);

const showController = new ShowController(showBusiness)

showRouter.get('/byWeekDay', (req, res) => showController.getShowsByDayWeek)

showRouter.post('/create', (req, res) => showController.createShow)
