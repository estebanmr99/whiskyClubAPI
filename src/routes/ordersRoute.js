import { Router } from 'express';
import { getOrdersById } from '../controllers/ordersController.js';

const router = Router();

router.get('/getOrdersById/:idUser', getOrdersById);


export default router; 