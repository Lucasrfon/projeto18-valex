import { Router } from "express";
import { requestCardCreation } from "../controllers/cardController";
import validateSchema from "../middlewares/validateSchema";
import newCardSchema from "../schemas/newCardSchema";

const cardRouter = Router();

cardRouter.post('/card', validateSchema(newCardSchema), requestCardCreation); //falta API e cryptr
cardRouter.patch('/activate');
// cardRouter.get('/card');
cardRouter.patch('/block')

export default cardRouter;