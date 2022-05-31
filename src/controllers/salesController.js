import pg from 'pg';

// Object created in memory to set the Pool connection with PostgresSQL DB
const config = {
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    max: process.env.DATABASE_MAX_CONNECTIONS,
    idleTimeoutMillis: process.env.DATABASE_TIME,
};

var pool = new pg.Pool(config);

export const addSale = async (req, res) => {
    // Preparing the pool connection to the DB
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Not able to stablish connection: " + err);
            // Return the error with BAD REQUEST (400) status
            res.status(400).send(err);
        }
        // Execution of a query directly into the DB with parameters
        client.query('SELECT * from prc_facturar($1, $2, $3, $4)', 
            [req.body.productosIDs, req.body.cantidades, req.body.clienteID, req.body.precioTotal], function (err, result) {
            done();
            if (err) {
                console.log(err);
                // Return the error with BAD REQUEST (400) status
                res.status(400).send(err);
            }
            var furniture;
            for (var i = 0; i < result.rows.length; i++) {
                furniture = result.rows[i];
            }
            // Return the result from the DB with OK (200) status
            res.status(200).send(furniture);
        });
    });
}

export const getSaleInfo = async (req, res) => {
    req.setTimeout(1000);

    // Preparing the pool connection to the DB
    const client =  await pool.connect();

    try{    
        // Execution of a queries directly into the DB with parameters
        const salesResult = await client.query('SELECT * from prc_obtener_ventas()', []).catch(err => {
            if (err) {
                console.log("Not able to stablish connection: " + err);
                // Return the error with BAD REQUEST (400) status
                res.status(400).send(err);
            }
        });
        
        var sales = [];
        for (let i = 0; i < salesResult.rows.length; i++) {
            sales.push(flattenObjectExceptArr(salesResult.rows[i]));
        }

        // Return the result from the DB with OK (200) status
        client.end();
        res.status(200).send(sales);
    } finally{
        client.release()
    }
}

const flattenObjectExceptArr = (obj) => {
    const flattened = {}
  
    Object.keys(obj).forEach((key) => {
      if (!Array.isArray(obj[key]) && typeof obj[key] === 'object' && obj[key] !== null) {
        Object.assign(flattened, flattenObjectExceptArr(obj[key]))
      } else {
        flattened[key] = obj[key]
      }
    })
  
    return flattened
}

const flattenObject = (obj) => {
    const flattened = {}
  
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        Object.assign(flattened, flattenObject(obj[key]))
      } else {
        flattened[key] = obj[key]
      }
    })
  
    return flattened
}