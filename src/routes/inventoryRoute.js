import { Router } from 'express';
import { getAllStoresInventory, updateStoreInventory, getProductsInfo, getStoresInfo } from '../controllers/inventoryController.js';
import { loginRequired } from '../controllers/userController.js';

const router = Router();

router.get('/getAllStoresInventory', loginRequired, getAllStoresInventory);

router.get('/getProductsInfo', loginRequired, getProductsInfo);

router.get('/getStoresInfo', loginRequired, getStoresInfo);

router.get('/getTypesInfo', loginRequired, getStoresInfo);

router.put('/updateStoreInventory', loginRequired, updateStoreInventory);

export default router;