
import { Router } from "express";

const transactionRouter = Router();

transactionRouter.get('/history');
transactionRouter.post('/recharge');
transactionRouter.post('/buy')

export default transactionRouter;