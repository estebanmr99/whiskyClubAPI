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

// Function to get all sales made for a user from the DB
export const getOrdersById = async (req, res) => {
    let user = req.params.idUser;
    var connection = await sqlPool.connect();
    
    var request = new sql.Request(connection);
    request.input("user", sql.Int, user);
  
    // Executing the query
    request.execute("prcGetOrdersById", function (err, recordset) {
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
          res.status(401).json({ message: "Could not find orders." });
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
