import { Router } from 'express';
import authRouter from './authRouter.js';
import categorieRouter from './categorieRouter.js';
import productRouter from './productRouter.js';


const router = Router();

router.use(authRouter);
router.use(productRouter);
router.use(categorieRouter);

export default router;