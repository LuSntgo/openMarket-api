import { Router } from 'express';
import { getCategories, createCategory, updateCategory, deleteCategory, getCategory } from '../controllers/categoriesController.js';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware.js';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';
import categorySchema from '../schemas/categorySchema.js';

const categoryRouter = Router();

categoryRouter.use(validateTokenMiddleware);

categoryRouter.get('/categories', getCategories);
categoryRouter.get('/categories/:id', getCategory);
categoryRouter.post('/categories', validateSchemaMiddleware(categorySchema), createCategory);
categoryRouter.put('/categories/:id', validateSchemaMiddleware(categorySchema), updateCategory);
categoryRouter.delete('/categories/:id', deleteCategory)

export default categoryRouter;