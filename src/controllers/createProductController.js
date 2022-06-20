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

// Load configuration for connection with the DB
const sqlPool = new sql.ConnectionPool(sqlConfig);

// Function to create a product in the DB
// Will recieve in the body:
//                            the product name to create
//                            the product features
//                            the product image
//                            the product price
export const insertProduct = async (req, res) => {
  // Preparing the pool connection to the DB
  var connection = await sqlPool.connect();
  // Preparing the query to insert the new user
  var request = new sql.Request(connection);
  request.input("nameParam", sql.VarChar, req.body.nameParam);
  request.input("typeParam", sql.Int, req.body.typeParam);
  request.input("agedParam", sql.VarChar, req.body.agedParam);
  request.input("presentationParam", sql.VarChar, req.body.presentationParam);
  request.input("imageParam", sql.VarChar, req.body.imageParam);
  request.input("globalPriceParam", sql.Money, req.body.globalPriceParam);

  // Executing the query
  request.execute("prcCreateProduct", function (err, recordset) {
    if (err) {
      console.log("Not able to stablish connection: " + err);
      // Return the error with BAD REQUEST (400) status
      res.status(400).send(err);
    }

    try {
      var key = Object.keys(recordset.recordset[0])[0];

      if (recordset.recordset[0][key].length == 0) {
        // Return the error with UNAUTHORIZED (401) status
        res.status(401).json({ message: "Could not insert product." });
      } else {
        var result = recordset.recordset[0][key];
        console.log(result);

        // Return the result from the DB with OK (200) status
        return res.status(200).send(result);
      }
    } catch (e) {
      console.log("Oops something happend: ");
    }
  });
};

// Function to get all types of a product the DB
// Will recieve in the body:
//                           the product id
//                           the action
//                           the name
export const getTypes = async (req, res) => {
  // Preparing the pool connection to the DB
  var connection = await sqlPool.connect();
  console.log(req.body);
  // Preparing the query to insert the new user
  var request = new sql.Request(connection);
  request.input("idType", sql.Int, req.body.idType);
  request.input("name", sql.VarChar, req.body.name);
  request.input("action", sql.Char, req.body.action);

  // Executing the query
  request.execute("CRUD_product_type", function (err, recordset) {
    if (err) {
      console.log("Not able to stablish connection: " + err);
      // Return the error with BAD REQUEST (400) status
      res.status(400).send(err);
    }

    try {
      var key = Object.keys(recordset.recordset[0])[0];

      if (recordset.recordset[0][key].length == 0) {
        // Return the error with UNAUTHORIZED (401) status
        res.status(401).json({ message: "Could not insert product." });
      } else {
        var result = JSON.parse(recordset.recordset[0][key]);
        console.log(result);

        // Return the result from the DB with OK (200) status
        return res.status(200).send(result);
      }
    } catch (e) {
      console.log("Oops something happend: ", e);
    }
  });
};
