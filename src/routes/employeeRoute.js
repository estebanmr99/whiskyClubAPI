import { Router } from 'express';
import { 
    getStoreEmployees, 
    getStoreEmployee, 
    updateStoreEmployee, 
    insertStoreEmployee,
    deleteStoreEmployee 
} from '../controllers/employeeController.js';

const router = Router();

// Get a store employee route
router.post('/getStoreEmployee', getStoreEmployee);

// Get all store employees route
router.post('/getStoreEmployees', getStoreEmployees);

// Update employee in store route
router.put('/updateStoreEmployee', updateStoreEmployee);

// Create a new employee route
router.put('/insertStoreEmployee', insertStoreEmployee);

// Delete a employee in store route
router.put('/deleteStoreEmployee', deleteStoreEmployee);

export default router;