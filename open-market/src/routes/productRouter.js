import { Router } from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct, getProduct } from '../controllers/productsController.js';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware.js';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';
import productSchema from '../schemas/productSchema.js';

const productRouter = Router();

productRouter.use(validateTokenMiddleware);

productRouter.get('/products', getProducts);
productRouter.get('/products/:id', getProduct);
productRouter.post('/products', validateSchemaMiddleware(productSchema), createProduct);
productRouter.put('/products/:id', validateSchemaMiddleware(productSchema), updateProduct);
productRouter.delete('/products/:id', deleteProduct)

export default productRouter;