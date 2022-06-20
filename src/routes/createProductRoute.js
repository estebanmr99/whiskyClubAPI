import { Router } from 'express';
import { insertProduct,getTypes } from '../controllers/createProductController.js';

const router = Router();

// Create product route
router.put('/insertProduct', insertProduct);

// Get all product types
router.post('/getTypes', getTypes);

export default router;