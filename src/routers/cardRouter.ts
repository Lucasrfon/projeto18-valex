import { Router } from "express";
import { requestCardCreation } from "../controllers/cardController";
import { validateAPIKey } from "../middlewares/validateAPIKey";
import validateSchema from "../middlewares/validateSchema";
import newCardSchema from "../schemas/newCardSchema";

const cardRouter = Router();

cardRouter.post('/card', validateAPIKey, validateSchema(newCardSchema), requestCardCreation);
cardRouter.patch('/activate');
// cardRouter.get('/card');
cardRouter.patch('/block')

export default cardRouter;