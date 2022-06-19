import { Router } from 'express';
import { getAllProducts, getProductTypes } from '../controllers/productController.js';
import { loginRequired } from '../controllers/userController.js';

const router = Router();

router.post('/getAllProducts', loginRequired, getAllProducts);

router.get('/getProductTypes', loginRequired, getProductTypes);

export default router;