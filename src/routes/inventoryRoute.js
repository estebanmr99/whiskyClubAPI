import { Router } from 'express';
import { getAllStoresInventory, updateStoreInventory, getProductsInfo, getStoresInfo } from '../controllers/inventoryController.js';
import { loginRequired } from '../controllers/userController.js';

const router = Router();

// Get all stores inventory route
router.get('/getAllStoresInventory', loginRequired, getAllStoresInventory);

// Get the information for all existing product route
router.get('/getProductsInfo', loginRequired, getProductsInfo);

// Get each store information route
router.get('/getStoresInfo', loginRequired, getStoresInfo);

// Update inventory in store route
router.put('/updateStoreInventory', loginRequired, updateStoreInventory);

export default router;