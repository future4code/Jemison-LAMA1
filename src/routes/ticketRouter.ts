import { showRouter } from './showRouter';
import { TicketController } from './../controller/ticketController';
import { TicketBusiness } from './../business/ticketBusiness';
import { Authenticator } from './../services/authenticator';
import { ShowDatabase } from './../data/showDatabase';
import { TicketDatabase } from './../data/ticketDatabase';
import express from 'express';
import { IdGenerator } from '../services/idGenerator';


export const ticketRouter = express.Router();

const ticketDatabase = new TicketDatabase()
const showDatabase = new ShowDatabase()
const idGenerator = new IdGenerator()
const authenticator = new Authenticator()

const ticketBusiness = new TicketBusiness(ticketDatabase, showDatabase, idGenerator, authenticator)
const ticketController = new TicketController(ticketBusiness)

showRouter.post('/create', (req, res) => ticketController.createTicket(req, res))

