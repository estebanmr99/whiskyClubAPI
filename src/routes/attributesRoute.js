import { Router } from 'express';
import { getCategoriesNames,
         getFeaturesNames,
         getCaresNames } from '../controllers/attributesController.js';
import { loginRequired } from '../controllers/userController.js';

const router = Router();

router.get('/getcategories', loginRequired, getCategoriesNames);

router.get('/getFeatures', loginRequired, getFeaturesNames);

router.get('/getCares', loginRequired, getCaresNames);

export default router;