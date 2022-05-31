import { Router } from 'express';
import { addFurniture,
        deleteFurniture,
        updateFurniture,
        getFurnitureInfo,
        getFurnitureProfile,
        addCategorieToFurniture,
        removeCategoriefromFurniture,
        addFeatureToFurniture,
        removeFeaturefromFurniture,
        addCareToFurniture,
        removeCarefromFurniture } from '../controllers/furnitureController.js';
import { loginRequired } from '../controllers/userController.js';

const router = Router();

router.post('/add', loginRequired, addFurniture);

router.delete('/delete', loginRequired, deleteFurniture);

router.put('/update/:productoID', loginRequired, updateFurniture);

router.post('/getall', loginRequired, getFurnitureInfo);

router.post('/profile/:productoID', loginRequired, getFurnitureProfile);

router.put('/addtocategorie', loginRequired, addCategorieToFurniture);

router.delete('/removefromcategorie', loginRequired, removeCategoriefromFurniture);

router.put('/addtoFeature', loginRequired, addFeatureToFurniture);

router.delete('/removefromFeature', loginRequired, removeFeaturefromFurniture);

router.put('/addtocare', loginRequired, addCareToFurniture);

router.delete('/removefromcare', loginRequired, removeCarefromFurniture);

export default router;