import express from "express";
import BandBusiness from "../business/BandBusiness";
import { BandDatabase } from "../data/bandDatabase";
import { Authenticator } from "../services/authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { BandController } from "../controller/bandController"

export const bandRouter = express.Router();

const bandBusiness = new BandBusiness(
  new BandDatabase(),
  new Authenticator(),
  new IdGenerator()
);
const bandController = new BandController(bandBusiness);

bandRouter.post("/register", bandController.bandRegister);