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


export const getCategoriesNames = (req, res) => {
    req.setTimeout(1000);
    // Execution of a query directly into the DB with parameters
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Not able to stablish connection: " + err);
            // Return the error with BAD REQUEST (400) status
            res.status(400).send(err);
        }
        // Execution of a query directly into the DB with parameters
        client.query('SELECT * from prc_obtener_categoria($1)', [''], function (err, result) {
            done();
            if (err) {
                console.log(err);
                // Return the error with BAD REQUEST (400) status
                res.status(400).send(err);
            }

            var furnitures = [];
            for (let i = 0; i < result.rows.length; i++) {
                furnitures.push(flattenObject(result.rows[i]));
            }

            // Return the result from the DB with OK (200) status
            res.status(200).send(furnitures);
        });
    });
}

export const getFeaturesNames = (req, res) => {
    req.setTimeout(1000);
    // Execution of a query directly into the DB with parameters
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Not able to stablish connection: " + err);
            // Return the error with BAD REQUEST (400) status
            res.status(400).send(err);
        }
        // Execution of a query directly into the DB with parameters
        client.query('SELECT * from prc_obtener_caracteristica($1)', [''], function (err, result) {
            done();
            if (err) {
                console.log(err);
                // Return the error with BAD REQUEST (400) status
                res.status(400).send(err);
            }

            var furnitures = [];
            for (let i = 0; i < result.rows.length; i++) {
                furnitures.push(flattenObject(result.rows[i]));
            }

            // Return the result from the DB with OK (200) status
            res.status(200).send(furnitures);
        });
    });
}

export const getCaresNames = (req, res) => {
    req.setTimeout(1000);
    // Execution of a query directly into the DB with parameters
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Not able to stablish connection: " + err);
            // Return the error with BAD REQUEST (400) status
            res.status(400).send(err);
        }
        // Execution of a query directly into the DB with parameters
        client.query('SELECT * from prc_obtener_cuidado($1)', [''], function (err, result) {
            done();
            if (err) {
                console.log(err);
                // Return the error with BAD REQUEST (400) status
                res.status(400).send(err);
            }
            

            var furnitures = [];
            for (let i = 0; i < result.rows.length; i++) {
                furnitures.push(flattenObject(result.rows[i]));
            }

            // Return the result from the DB with OK (200) status
            res.status(200).send(furnitures);
        });
    });
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