
import { Router } from "express";
import { requestCardHistory, requestOnlinePurchase, requestPurchase, requestRecharge } from "../controllers/transactionsController";
import validateSchema from "../middlewares/validateSchema";
import onlinePurchaseSchema from "../schemas/onlinePurchaseSchema";
import purchaseSchema from "../schemas/purchaseSchema";
import rechargeSchema from "../schemas/rechargeSchema";

const transactionRouter = Router();

// transactionRouter.get('/history');
transactionRouter.get('/history/:id', requestCardHistory);
transactionRouter.post('/recharge', validateSchema(rechargeSchema), requestRecharge);
transactionRouter.post('/buy', validateSchema(purchaseSchema), requestPurchase);
transactionRouter.post('/buy/online', validateSchema(onlinePurchaseSchema), requestOnlinePurchase);

export default transactionRouter;