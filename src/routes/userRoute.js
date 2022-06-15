import { Router } from 'express';
import { login, register,subscription } from '../controllers/userController.js';

const router = Router();

// Registration route
router.post('/auth/register', register);

// Login route
router.post('/login', login);

//Subscription route
router.post('/subscription', subscription);

export default router;