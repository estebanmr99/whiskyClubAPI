import { Router } from 'express';
import { getOrdersById } from '../controllers/ordersController.js';
import { loginRequired } from '../controllers/userController.js';

const router = Router();

// Get the sales made by a user route
router.get('/getOrdersById/:idUser', loginRequired, getOrdersById);

export default router; 