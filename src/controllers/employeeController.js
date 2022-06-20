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


// Function to get all employees from a store from the DB
// Will recieve in the body:
//                            the store id
//                            the country
export const getStoreEmployees = async (req, res) => {
  var idStore = req.body.idStore;
  var country = req.body.country;
  console.log(req.body);
  var connection = await sqlPool.connect();

  var request = new sql.Request(connection);
  request.input("store", sql.Int, idStore);
  request.input("country", sql.VarChar, country);

  // Executing the query
  request.execute("prcFindEmployeesByStore", function (err, recordset) {
    if (err) {
      console.log("Not able to stablish connection: " + err);
      // Return the error with BAD REQUEST (400) status
      res.status(400).send(err);
    }

    try {
      var key = Object.keys(recordset.recordset[0])[0];

      if (recordset.recordset[0][key].length == 0) {
        // Return the error with UNAUTHORIZED (401) status
        res.status(401).json({ message: "Could not find employees." });
      } else {
        var result = JSON.parse(recordset.recordset[0][key]);
        console.log("RESULT",result);

        // Return the result from the DB with OK (200) status
        return res.status(200).send(result);
      }
    } catch (e) {
      console.log("Oops something happend: ", e);
    }
  });
};

// Function to get a employee from a store from the DB
// Will recieve in the body:
//                            the store id
//                            the empleyee id
//                            the country
export const getStoreEmployee = async (req, res) => {
  var store = req.body.idStore;
  var employee = req.body.idEmployee;
  var country = req.body.country;
  var connection = await sqlPool.connect();

  var request = new sql.Request(connection);
  request.input("store", sql.Int, store);
  request.input("idEmployee", sql.Int, employee);
  request.input("country", sql.VarChar, country);

  // Executing the query
  request.execute("prcFindEmployeeByStore", function (err, recordset) {
    if (err) {
      console.log("Not able to stablish connection: " + err);
      // Return the error with BAD REQUEST (400) status
      res.status(400).send(err);
    }

    try {
      console.log(recordset);
      var key = Object.keys(recordset.recordset[0])[0];

      if (recordset.recordset[0][key].length == 0) {
        // Return the error with UNAUTHORIZED (401) status
        res.status(401).json({ message: "Could not find employees." });
      } else {
        var result = JSON.parse(recordset.recordset[0][key]);
        console.log(result[0].Ep[0].name);

        // Return the result from the DB with OK (200) status
        return res.status(200).send(result);
      }
    } catch (e) {
      console.log("Oops something happend: ", e);
    }
  });
};

// Function to update a employees in a store in the DB
// Will recieve in the body:
//                            the store id
//                            the employee id
//                            the employee name
//                            the employee last name
//                            the employee birth date
//                            the employee local salary
//                            the employee global salary
//                            the country
export const updateStoreEmployee = async (req, res) => {
  // Preparing the pool connection to the DB
  var connection = await sqlPool.connect();
  console.log(req.body);
  // Preparing the query to insert the new user
  var request = new sql.Request(connection);
  request.input("store", sql.Int, req.body.store);
  request.input("idEmployee", sql.Int, req.body.idEmployee);
  request.input("name", sql.VarChar, req.body.name);
  request.input("lastName", sql.VarChar, req.body.lastName);
  request.input("birthDate", sql.VarChar, req.body.birthDate);
  request.input("localSalary", sql.Money, req.body.localSalary);
  request.input("globalSalary", sql.Money, req.body.globalSalary);
  request.input("country", sql.VarChar, req.body.country);

  // Executing the query
  request.execute("prcUpdateEmployeeByStore", function (err, recordset) {
    if (err) {
      console.log("Not able to stablish connection: " + err);
      // Return the error with BAD REQUEST (400) status
      res.status(400).send(err);
    }

    try {
      console.log(recordset);
      var key = Object.keys(recordset.recordset[0])[0];
      if (recordset.recordset[0][key].length == 0) {
        // Return the error with UNAUTHORIZED (401) status
        res.status(401).json({ message: "Could not update store employee." });
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

// Function to create a employee in a store in the DB
// Will recieve in the body:
//                            the store id
//                            the employee id
//                            the employee name
//                            the employee last name
//                            the employee birth date
//                            the employee local salary
//                            the employee global salary
export const insertStoreEmployee = async (req, res) => {
  // Preparing the pool connection to the DB
  var connection = await sqlPool.connect();
  console.log(req.body);
  // Preparing the query to insert the new user
  var request = new sql.Request(connection);
  request.input("store", sql.Int, req.body.store);
  request.input("name", sql.VarChar, req.body.name);
  request.input("lastName", sql.VarChar, req.body.lastName);
  request.input("birthDate", sql.Date, req.body.birthDate);
  request.input("localSalary", sql.Money, req.body.localSalary);
  request.input("globalSalary", sql.Money, req.body.globalSalary);
  request.input("country", sql.VarChar, req.body.country);

  // Executing the query
  request.execute("prcInsertEmployeeByStore", function (err, recordset) {
    if (err) {
      console.log("Not able to stablish connection: " + err);
      // Return the error with BAD REQUEST (400) status
      res.status(400).send(err);
    }

    try {
      var key = Object.keys(recordset.recordset[0])[0];

      if (recordset.recordset[0][key].length == 0) {
        // Return the error with UNAUTHORIZED (401) status
        res.status(401).json({ message: "Could not insert store employee." });
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

// Function to delete a employee in a store from the DB
// Will recieve in the body:
//                            the store id
//                            the employee id
export const deleteStoreEmployee = async (req, res) => {
  var store = req.body.idStore;
  var employee = req.body.idEmployee;
  var country = req.body.country;

  var connection = await sqlPool.connect();

  var request = new sql.Request(connection);
  request.input("store", sql.Int, store);
  request.input("idEmployee", sql.Int, employee);
  request.input("country", sql.VarChar, country);

  // Executing the query
  request.execute("prcDeleteEmployeeByStore", function (err, recordset) {
    if (err) {
      console.log("Not able to stablish connection: " + err);
      // Return the error with BAD REQUEST (400) status
      res.status(400).send(err);
    }

    try {
      console.log(recordset);
      var key = Object.keys(recordset.recordset[0])[0];

      if (recordset.recordset[0][key].length == 0) {
        // Return the error with UNAUTHORIZED (401) status
        res.status(401).json({ message: "Could not delete employees." });
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
