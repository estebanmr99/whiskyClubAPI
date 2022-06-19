import user from './userRoute.js';
import inventory from './inventoryRoute.js';
import employee from './employeeRoute.js';
import orders from './ordersRoute.js';
import createProducts from './createProductRoute.js';
import product from './productRoute.js';

// Index file as a middleware for route calls
export default {
  user,
  inventory,
  employee,
  orders,
  createProducts,
  product,
};