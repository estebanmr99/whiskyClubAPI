import sql from "mssql";

// Object created in memory to set the Pool connection with SQLSERVER DB
const sqlConfig = {
  server: process.env.SQL_SERVER,
  authentication: {
    type: "default",
    options: {
      userName: process.env.SQL_DATABASE_USER,
      password: process.env.SQL_DATABASE_PASSWORD,
    },
  },
  database: process.env.SQL_DATABASE,
  options: {
    trustServerCertificate: true,
    encrypt: false,
  },
};

const sqlPool = new sql.ConnectionPool(sqlConfig);

export const getAllProducts = async (req, res) => {
  // Preparing the pool connection to the DB
  var connection = await sqlPool.connect();

  // Preparing the query to insert the new user
  var request = new sql.Request(connection);
  request.input("searchQuery", sql.VarChar, req.body.searchQuery);
  request.input("idUserParam", sql.Int, req.body.idUser);
  request.input("idType", sql.Int, req.body.idType);
  request.input("distance", sql.Int, req.body.distance);
  request.input("price", sql.Int, req.body.price);
  request.input("order", sql.VarChar, req.body.order);
  request.input("country", sql.VarChar, req.body.country);

  // Executing the query
  request.execute("prcGetAllProducts", function (err, recordset) {
    if (err) {
      console.log("Not able to stablish connection: " + err);
      // Return the error with BAD REQUEST (400) status
      res.status(400).send(err);
    }

    try {
      var key = Object.keys(recordset.recordset[0])[0];

      if (recordset.recordset[0][key].length == 0) {
        // Return the error with UNAUTHORIZED (401) status
        res.status(401).json({ message: "Could not retrieve products." });
      } else {
        var result = JSON.parse(recordset.recordset[0][key]);

        result.forEach((product, index) => {
            if (result[index].features){
                result[index].features = JSON.parse(product.features);
            }
            if (result[index].image){
                result[index].image = product.image.replace("\n", "");
            }
        });

        console.log(result);
        // Return the result from the DB with OK (200) status
        return res.status(200).json(result);
      }
    } catch (e) {
      console.log("Oops something happend: ", e);
    }
  });
};


export const getProductTypes = async (req, res) => {
    // Internal function to search the user in the DB
    var connection = await sqlPool.connect();
    connection.request().input('action', sql.VarChar, 'R').execute("CRUD_product_type", function (err, recordset) {
      if (err) {
        console.log("Not able to stablish connection: " + err);
        // Return the error with BAD REQUEST (400) status
        res.status(400).send(err);
      }
      try {
        if (!recordset.recordset) {
          res.status(401).send({ message: "No records found." });
          return;
        }
  
        var key = Object.keys(recordset.recordset[0])[0];
  
        if (JSON.parse(recordset.recordset[0][key]).length == 0) {
          // Return the error with UNAUTHORIZED (401) status
          res.status(401).json({ message: "No records found." });
        } else {
          var result = JSON.parse(recordset.recordset[0][key]);
          console.log(result);
  
          // Return the JWT token with OK (200) status
          return res.status(200).send(result);
        }
      } catch (e) {
        console.log("Oops something happend: ", e);
      }
    });
  };