
import { Router } from "express";
import { requestCardHistory, requestPurchase, requestRecharge } from "../controllers/transactionsController";
import validateSchema from "../middlewares/validateSchema";
import purchaseSchema from "../schemas/purchaseSchema";
import rechargeSchema from "../schemas/rechargeSchema";

const transactionRouter = Router();

// transactionRouter.get('/history');
transactionRouter.get('/history/:id', requestCardHistory);
transactionRouter.post('/recharge', validateSchema(rechargeSchema), requestRecharge);
transactionRouter.post('/buy', validateSchema(purchaseSchema), requestPurchase);

export default transactionRouter;