import { IdGenerator } from './../services/idGenerator';
import { Authenticator } from './../services/authenticator';
import { EventPhotosDatabase } from './../data/eventPhotosDatabase';
import { EventPhotosController } from './../controller/eventPhotosController';
import { EventPhotosBusiness } from '../business/eventPhotosBusiness';
import express from 'express';


export const eventPhotosRouter = express.Router()

const eventPhotosDatabase = new EventPhotosDatabase()
const authenticator = new Authenticator()
const idGenerator = new IdGenerator()

const eventphotosBusiness = new EventPhotosBusiness(eventPhotosDatabase, authenticator, idGenerator)
const eventosPhotosController = new EventPhotosController(eventphotosBusiness)

eventPhotosRouter.get('/getAllPhotos', (req, res) => eventosPhotosController.getAllEventPhotos(req, res))

eventPhotosRouter.post('/create', (req, res) => eventosPhotosController.eventPhotoRegister(req, res))