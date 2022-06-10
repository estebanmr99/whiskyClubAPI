import user from './userRoute.js';
import furniture from './furnitureRoute.js';
import attributes from './attributesRoute.js';
import sales from './salesRoute.js';
import inventory from './inventoryRoute.js';


// Index file as a middleware for route calls
export default {
  user,
  furniture,
  attributes,
  sales,
  inventory
};