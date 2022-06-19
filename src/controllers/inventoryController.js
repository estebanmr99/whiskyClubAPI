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

export const getAllStoresInventory = async (req, res) => {
  // Internal function to search the user in the DB
  var connection = await sqlPool.connect();
  connection.request().execute("prcGetStoresInventory", function (err, recordset) {
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
        var products = JSON.parse(recordset.recordset[0][key]);
        console.log(products);

        // Return the JWT token with OK (200) status
        return res.status(200).send(products);
      }
    } catch (e) {
      console.log("Oops something happend: ", e);
    }
  });
};

export const getStoresInfo = async (req, res) => {
  // Internal function to search the user in the DB
  var connection = await sqlPool.connect();
  connection.request().execute("prcGetStoresInfo", function (err, recordset) {
    if (err) {
      console.log("Not able to stablish connection: " + err);
      // Return the error with BAD REQUEST (400) status
      res.status(400).send(err);
    }
    try {
      console.log(recordset);
      var key = Object.keys(recordset.recordset[0])[0];

      if (JSON.parse(recordset.recordset[0][key]).length == 0) {
        // Return the error with UNAUTHORIZED (401) status
        res.status(401).json({ message: "No records found." });
      } else {
        var stores = JSON.parse(recordset.recordset[0][key]);
        console.log(stores);

        // Return the JWT token with OK (200) status
        return res.status(200).send(stores);
      }
    } catch (e) {
      console.log("Oops something happend: ", e);
    }
  });
};

export const getProductsInfo = async (req, res) => {
  // Internal function to search the user in the DB
  var connection = await sqlPool.connect();
  connection.request().execute("prcGetProductsInfo", function (err, recordset) {
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
        var products = JSON.parse(recordset.recordset[0][key]);
        console.log(products);

        // Return the JWT token with OK (200) status
        return res.status(200).send(products);
      }
    } catch (e) {
      console.log("Oops something happend: ", e);
    }
  });
};

export const updateStoreInventory = async (req, res) => {
  // Preparing the pool connection to the DB
  var connection = await sqlPool.connect();

  // Preparing the query to insert the new user
  var request = new sql.Request(connection);
  request.input("idStoreParam", sql.Int, req.body.idStore);
  request.input("idProductParam", sql.Int, req.body.idProduct);
  request.input("currencyParam", sql.VarChar, req.body.currency);
  request.input("localPriceParam", sql.Int, req.body.localPrice);
  request.input("globalPriceParam", sql.Int, req.body.globalPrice);
  request.input("quantityParam", sql.Int, req.body.quantity);
  request.input("country", sql.VarChar, req.body.country);

  // Executing the query
  request.execute("prcUpdateStoreInventory", function (err, recordset) {
    if (err) {
      console.log("Not able to stablish connection: " + err);
      // Return the error with BAD REQUEST (400) status
      res.status(400).send(err);
    }

    try {
      var key = Object.keys(recordset.recordset[0])[0];

      if (recordset.recordset[0][key].length == 0) {
        // Return the error with UNAUTHORIZED (401) status
        res.status(401).json({ message: "Could not update store inventory." });
      } else {
        var result = recordset.recordset[0][key];
        console.log(result);

        // Return the result from the DB with OK (200) status
        return res.status(200).json(result);
      }
    } catch (e) {
      console.log("Oops something happend: ", e);
    }
  });
};
