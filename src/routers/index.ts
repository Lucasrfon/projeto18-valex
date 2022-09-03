import {Router} from "express";
import cardRouter from "./cardRouter";
import transactionRouter from "./transactionsRouter";

const router = Router();

router.use(cardRouter);
router.use(transactionRouter);

export default router;