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

export const addFurniture = async (req, res) => {
    // Preparing the pool connection to the DB
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Not able to stablish connection: " + err);
            // Return the error with BAD REQUEST (400) status
            res.status(400).send(err);
        }
        // Execution of a query directly into the DB with parameters
        client.query('SELECT * from prc_crear_producto($1, $2, $3, $4)', 
            [req.body.nombre, req.body.precio, req.body.imagen, req.body.cantidad], function (err, result) {
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

export const deleteFurniture = (req, res) => {
    // Preparing the pool connection to the DB
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Not able to stablish connection: " + err);
            // Return the error with BAD REQUEST (400) status
            res.status(400).send(err);
        }
        // Execution of a query directly into the DB with parameters
        client.query('SELECT * from prc_eliminar_producto($1)', [req.body.productoID], function (err, result) {
            done();
            if (err) {
                console.log(err);
                // Return the error with BAD REQUEST (400) status
                res.status(400).send(err);
            }
            // Return with OK (200) status
            res.status(200).send();
        });
    });
}

export const updateFurniture = async (req, res) => {
    // Preparing the pool connection to the DB
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Not able to stablish connection: " + err);
            // Return the error with BAD REQUEST (400) status
            res.status(400).send(err);
        }
        // Execution of a query directly into the DB with parameters
        client.query('SELECT * from prc_actualizar_producto($1, $2, $3, $4, $5)', 
            [req.params.productoID, req.body.nombre, req.body.precio, req.body.imagen, req.body.cantidad], function (err, result) {
            done();
            if (err) {
                console.log(err);
                // Return the error with BAD REQUEST (400) status
                res.status(400).send(err);
            }
            // Return with OK (200) status
            res.status(200).send();
        });
    });
}

export const getFurnitureInfo = async (req, res) => {
    req.setTimeout(1000);

    // Preparing the pool connection to the DB
    const client =  await pool.connect();

    try{    
        // Execution of a queries directly into the DB with parameters
        const furnituresResult = await client.query('SELECT * from prc_obtener_producto_params($1, $2, $3)', 
         [req.body.categoriaID, req.body.caracteristicaID, req.body.cuidadoID]).catch(err => {
            if (err) {
                console.log("Not able to stablish connection: " + err);
                // Return the error with BAD REQUEST (400) status
                res.status(400).send(err);
            }
        });

        var furnitures = [];
        for (let i = 0; i < furnituresResult.rows.length; i++) {
            furnitures.push(flattenObject(furnituresResult.rows[i]));
        }
        
        // Return the result from the DB with OK (200) status
        client.end();
        res.status(200).send(furnitures);
    } finally{
        client.release()
    }
}


// Function to student profile information
// Will recieve in the body:
//                            the unique student id

export const getFurnitureProfile = async (req, res) => {

    req.setTimeout(1000);

    // Preparing the pool connection to the DB
    const client =  await pool.connect();

    try{
        // Execution of a queries directly into the DB with parameters
        const furnitureInfoResult = await client.query('SELECT * from prc_obtener_producto($1)',[req.params.productoID]).catch(err => {
            if (err) {
                console.log("Not able to stablish connection: " + err);
                // Return the error with BAD REQUEST (400) status
                res.status(400).send(err);
            }
        });
        const furnitureCategoriesResult = await client.query('SELECT * from prc_obtener_categoria($1)',[req.params.productoID]).catch(err => {
            if (err) {
                console.log("Not able to stablish connection: " + err);
                // Return the error with BAD REQUEST (400) status
                res.status(400).send(err);
            }
        });
        const furnitureFeaturesResult = await client.query('SELECT * from prc_obtener_caracteristica($1)',[req.params.productoID]).catch(err => {
            if (err) {
                console.log("Not able to stablish connection: " + err);
                // Return the error with BAD REQUEST (400) status
                res.status(400).send(err);
            }
        });
        const furnitureCaresResult = await client.query('SELECT * from prc_obtener_cuidado($1)',[req.params.productoID]).catch(err => {
            if (err) {
                console.log("Not able to stablish connection: " + err);
                // Return the error with BAD REQUEST (400) status
                res.status(400).send(err);
            }
        });

        var furnitureInfo = furnitureInfoResult.rows[0];
        
        var categoriesFlattern = [];
        for (let i = 0; i < furnitureCategoriesResult.rows.length; i++) {
            categoriesFlattern.push(flattenObjectExceptArr(furnitureCategoriesResult.rows[i]));
        }
        furnitureInfo["categorias"] = categoriesFlattern;

        var featuresFlattern = [];
        for (let i = 0; i < furnitureFeaturesResult.rows.length; i++) {
            featuresFlattern.push(flattenObjectExceptArr(furnitureFeaturesResult.rows[i]));
        }
        furnitureInfo["caracteristicas"] = featuresFlattern;

        var caresFlattern = [];
        for (let i = 0; i < furnitureCaresResult.rows.length; i++) {
            caresFlattern.push(flattenObjectExceptArr(furnitureCaresResult.rows[i]));
        }
        furnitureInfo["cuidados"] = caresFlattern;

        // Return the result from the DB with OK (200) status
        client.end();
        res.status(200).send(furnitureInfo);

    } finally{
        client.release()
    }
}

export const addCategorieToFurniture = (req, res) => {
    // Preparing the pool connection to the DB
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Not able to stablish connection: " + err);
            // Return the error with BAD REQUEST (400) status
            res.status(400).send(err);
        }
        // Execution of a query directly into the DB with parameters
        client.query('SELECT * from prc_agregar_categoria_producto($1, $2)', [req.body.productosIDs, req.body.categoriasIDs], function (err, result) {
            done();
            if (err) {
                console.log(err);
                // Return the error with BAD REQUEST (400) status
                res.status(400).send(err);
            }
            // Return the result from the DB with OK (200) status
            res.status(200).send();
        });
    });
}

export const removeCategoriefromFurniture = (req, res) => {
    // Preparing the pool connection to the DB
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Not able to stablish connection: " + err);
            // Return the error with BAD REQUEST (400) status
            res.status(400).send(err);
        }
        // Execution of a query directly into the DB with parameters
        client.query('SELECT * from prc_eliminar_categoria_producto($1, $2)', [req.body.productosIDs, req.body.categoriasIDs], function (err, result) {
            done();
            if (err) {
                console.log(err);
                // Return the error with BAD REQUEST (400) status
                res.status(400).send(err);
            }
            // Return the result from the DB with OK (200) status
            res.status(200).send();
        });
    });
}

export const addFeatureToFurniture = (req, res) => {
    // Preparing the pool connection to the DB
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Not able to stablish connection: " + err);
            // Return the error with BAD REQUEST (400) status
            res.status(400).send(err);
        }
        // Execution of a query directly into the DB with parameters
        client.query('SELECT * from prc_agregar_caracteristica_producto($1, $2)', [req.body.productosIDs, req.body.caracteristicasIDs], function (err, result) {
            done();
            if (err) {
                console.log(err);
                // Return the error with BAD REQUEST (400) status
                res.status(400).send(err);
            }
            // Return the result from the DB with OK (200) status
            res.status(200).send();
        });
    });
}

export const removeFeaturefromFurniture = (req, res) => {
    // Preparing the pool connection to the DB
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Not able to stablish connection: " + err);
            // Return the error with BAD REQUEST (400) status
            res.status(400).send(err);
        }
        // Execution of a query directly into the DB with parameters
        client.query('SELECT * from prc_eliminar_caracteristica_producto($1, $2)', [req.body.productosIDs, req.body.caracteristicasIDs], function (err, result) {
            done();
            if (err) {
                console.log(err);
                // Return the error with BAD REQUEST (400) status
                res.status(400).send(err);
            }
            // Return the result from the DB with OK (200) status
            res.status(200).send();
        });
    });
}

export const addCareToFurniture = (req, res) => {
    // Preparing the pool connection to the DB
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Not able to stablish connection: " + err);
            // Return the error with BAD REQUEST (400) status
            res.status(400).send(err);
        }
        // Execution of a query directly into the DB with parameters
        client.query('SELECT * from prc_agregar_cuidado_producto($1, $2)', [req.body.productosIDs, req.body.cuidadosIDs], function (err, result) {
            done();
            if (err) {
                console.log(err);
                // Return the error with BAD REQUEST (400) status
                res.status(400).send(err);
            }
            // Return the result from the DB with OK (200) status
            res.status(200).send();
        });
    });
}

export const removeCarefromFurniture = (req, res) => {
    // Preparing the pool connection to the DB
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Not able to stablish connection: " + err);
            // Return the error with BAD REQUEST (400) status
            res.status(400).send(err);
        }
        // Execution of a query directly into the DB with parameters
        client.query('SELECT * from prc_eliminar_cuidado_producto($1, $2)', [req.body.productosIDs, req.body.cuidadosIDs], function (err, result) {
            done();
            if (err) {
                console.log(err);
                // Return the error with BAD REQUEST (400) status
                res.status(400).send(err);
            }
            // Return the result from the DB with OK (200) status
            res.status(200).send();
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