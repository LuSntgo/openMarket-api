import { Router } from 'express';
import authRouter from './authRouter.js';
import userRouter from './userRouter.js';
import productRouter from './productRouter.js';
import categoryRouter from './categoryRouter.js';

const router = Router();
router.use(userRouter);
router.use(authRouter);
router.use(productRouter);
router.use(categoryRouter);

export default router;