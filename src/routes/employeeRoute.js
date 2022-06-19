import { Router } from 'express';
import { 
    getStoreEmployees, 
    getStoreEmployee, 
    updateStoreEmployee, 
    insertStoreEmployee,
    deleteStoreEmployee 
} from '../controllers/employeeController.js';

const router = Router();

router.post('/getStoreEmployee', getStoreEmployee);

router.post('/getStoreEmployees', getStoreEmployees);

router.put('/updateStoreEmployee', updateStoreEmployee);

router.put('/insertStoreEmployee', insertStoreEmployee);

router.put('/deleteStoreEmployee', deleteStoreEmployee);


export default router;