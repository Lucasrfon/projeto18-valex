import { Router } from "express";
import { requestCardActivation, requestCardCreation, toggleCardBlock } from "../controllers/cardController";
import validateSchema from "../middlewares/validateSchema";
import cardActivationSchema from "../schemas/cardActivationSchema";
import cardIdentifierSchema from "../schemas/cardIdentifierSchema";
import newCardSchema from "../schemas/newCardSchema";

const cardRouter = Router();

cardRouter.post('/card', validateSchema(newCardSchema), requestCardCreation); //falta API e cryptr
cardRouter.put('/activate', validateSchema(cardActivationSchema), requestCardActivation);
// cardRouter.get('/card');
cardRouter.put('/block', validateSchema(cardIdentifierSchema), toggleCardBlock);
cardRouter.put('/unblock', validateSchema(cardIdentifierSchema), toggleCardBlock);

export default cardRouter;