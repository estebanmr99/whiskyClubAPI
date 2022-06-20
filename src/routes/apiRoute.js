import routes from './index.js';

// Here all the routes are processed
const route = (app) => {
    //Route for requests related to user data
    app.use('/user', routes.user);

    app.use('/inventory', routes.inventory);

    app.use('/employee', routes.employee);

    app.use('/orders', routes.orders);

    app.use('/createProducts', routes.createProducts);

    app.use('/product', routes.product);
    
    //Routes for basic requests
    
    app.get('/', (req, res) => {
        return res.send('Received a GET HTTP method');
    });
        
    app.post('/', (req, res) => {
        return res.send('Received a POST HTTP method');
    });
    
    app.put('/', (req, res) => {
        return res.send('Received a PUT HTTP method');
    });
    
    app.delete('/', (req, res) => {
        return res.send('Received a DELETE HTTP method');
    });
}

export default route;