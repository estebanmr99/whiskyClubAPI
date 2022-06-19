import { Router } from 'express';
import { insertProduct,getTypes } from '../controllers/createProductController.js';

const router = Router();

router.put('/insertProduct', insertProduct);

router.post('/getTypes', getTypes);

export default router;