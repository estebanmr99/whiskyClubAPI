import routes from './index.js';

const route = (app) => {
    //Route for requests related to user data
    app.use('/user', routes.user);

    app.use('/furniture', routes.furniture);

    app.use('/attributes', routes.attributes);

    app.use('/sales', routes.sales);

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