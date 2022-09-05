
import { Router } from "express";
import { requestRecharge } from "../controllers/transactionsController";
import validateSchema from "../middlewares/validateSchema";
import rechargeSchema from "../schemas/rechargeSchema";

const transactionRouter = Router();

transactionRouter.get('/history');
transactionRouter.post('/recharge', validateSchema(rechargeSchema), requestRecharge);
transactionRouter.post('/buy')

export default transactionRouter;