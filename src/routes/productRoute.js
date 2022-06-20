import { Router } from 'express';
import { getAllProducts, getProductTypes } from '../controllers/productController.js';
import { loginRequired } from '../controllers/userController.js';

const router = Router();

// Get all products route
router.post('/getAllProducts', loginRequired, getAllProducts);

// Get product types route
router.get('/getProductTypes', loginRequired, getProductTypes);

export default router;