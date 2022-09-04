import { Router } from "express";
import { requestCardActivation, requestCardCreation } from "../controllers/cardController";
import validateSchema from "../middlewares/validateSchema";
import cardActivationSchema from "../schemas/cardActivationSchema";
import newCardSchema from "../schemas/newCardSchema";

const cardRouter = Router();

cardRouter.post('/card', validateSchema(newCardSchema), requestCardCreation); //falta API e cryptr
cardRouter.patch('/activate', validateSchema(cardActivationSchema), requestCardActivation);
// cardRouter.get('/card');
cardRouter.patch('/block')

export default cardRouter;