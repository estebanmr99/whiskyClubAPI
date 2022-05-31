import { Router } from 'express';
import { addSale, getSaleInfo } from '../controllers/salesController.js';
import { loginRequired } from '../controllers/userController.js';

const router = Router();

router.post('/add', loginRequired, addSale);

router.post('/getAll', loginRequired, getSaleInfo);

export default router;