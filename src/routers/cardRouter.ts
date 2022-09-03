
import { Router } from "express";

const cardRouter = Router();

cardRouter.post('/card');
cardRouter.patch('/activate');
// cardRouter.get('/card');
cardRouter.patch('/block')

export default cardRouter;