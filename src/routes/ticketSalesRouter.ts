import { TicketSalesController } from './../controller/ticketSalesController';
import { TicketSalesBusiness } from './../business/ticketSalesBusiness';
import { IdGenerator } from './../services/idGenerator';
import { TicketDatabase } from './../data/ticketDatabase';
import { Authenticator } from './../services/authenticator';
import { TicketSalesDatabase } from './../data/ticketSalesDatabase';
import express from 'express'

export const ticketSalesRouter = express.Router()

const ticketSalesDatabase = new TicketSalesDatabase();
const authenticator = new Authenticator();
const ticketDatabase = new TicketDatabase();
const idGenerator = new IdGenerator();

const ticketSalesBusiness = new TicketSalesBusiness(ticketSalesDatabase, authenticator, ticketDatabase, idGenerator);
const ticketSalesController = new TicketSalesController(ticketSalesBusiness)

ticketSalesRouter.post('/create', (req, res) => ticketSalesController.createTicketSale(req, res));