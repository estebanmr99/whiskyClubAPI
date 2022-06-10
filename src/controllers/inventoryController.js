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
  const tempStoresIneventoryArray = [
    {
      idProduct: 1,
      currency: "USD",
      globalPrice: 100,
      localPrice: 10,
      inventory: {
        idProduct: 1,
        idStore: 1,
        quantity: 10,
      },
    },
    {
      idProduct: 1,
      currency: "USD",
      globalPrice: 100,
      localPrice: 10,
      inventory: {
        idProduct: 1,
        idStore: 3,
        quantity: 4,
      },
    },
    {
      idProduct: 3,
      currency: "EUR",
      globalPrice: 100,
      localPrice: 10,
      inventory: {
        idProduct: 1,
        idStore: 4,
        quantity: 50,
      },
    },
  ];

  res.status(200).send(tempStoresIneventoryArray);

  // Internal function to search the user in the DB
  //   var connection = await sqlPool.connect();
  //   connection
  //     .request()
  //     .execute("prcGetAllStoresInventory", function (err, recordset) {
  //       if (err) {
  //         console.log("Not able to stablish connection: " + err);
  //         // Return the error with BAD REQUEST (400) status
  //         res.status(400).send(err);
  //       }
  //       try {
  //         var key = Object.keys(recordset.recordset[0])[0];
  //         if (JSON.parse(recordset.recordset[0][key]).length == 0) {
  //           // Return the error with UNAUTHORIZED (401) status
  //           res
  //             .status(401)
  //             .json({ message: "Authentication failed. No user found" });
  //         } else {
  //           var user = JSON.parse(recordset.recordset[0][key])[0];
  //           console.log(user);
  //           if (!comparePassword(req.body.password, user.password)) {
  //             // Return the error with UNAUTHORIZED (401) status
  //             res
  //               .status(401)
  //               .json({ message: "Authentication failed. Wrong password" });
  //           } else {
  //             // If everything is ok, create a token with the user id
  //             const currentDate = new Date();
  //             currentDate.setHours(currentDate.getHours() + 7);
  //             // Return the JWT token with OK (200) status
  //             return res
  //               .status(200)
  //               .json({
  //                 token: jwt.sign(
  //                   {
  //                     email: user.email,
  //                     _id: user.idUser,
  //                     _idUserType: user.idUserType,
  //                     _idLevel: user.idLevel,
  //                     name: user.name,
  //                     lastName: user.lastName,
  //                     exp: Math.floor(currentDate / 1000),
  //                   },
  //                   process.env.SECRET_KEY
  //                 ),
  //               });
  //           }
  //         }
  //       } catch (e) {
  //         console.log("Oops something happend: ", e);
  //       }
  //     });
};

export const getStoresInfo = async (req, res) => {
  var tempStoreInfoArray = [
    { idStore: 1, name: "Dublin" },
    { idStore: 2, name: "Dallas" },
    { idStore: 3, name: "Edinburgh" },
    { idStore: 4, name: "Galway" },
  ];

  res.status(200).send(tempStoreInfoArray);

  // Internal function to search the user in the DB
  // var connection = await sqlPool.connect();
  // connection.request().execute('prcGetAllStoresInventory', function(err, recordset) {
  //     if (err) {
  //         console.log("Not able to stablish connection: " + err);
  //         // Return the error with BAD REQUEST (400) status
  //         res.status(400).send(err);
  //     }
  //     try{
  //         var key = Object.keys(recordset.recordset[0])[0];

  //         if (JSON.parse(recordset.recordset[0][key]).length == 0) {
  //             // Return the error with UNAUTHORIZED (401) status
  //             res.status(401).json({ message: 'Authentication failed. No user found' });
  //         } else {
  //             var user = JSON.parse(recordset.recordset[0][key])[0];
  //             console.log(user);

  //             if (!comparePassword(req.body.password, user.password)) {
  //                 // Return the error with UNAUTHORIZED (401) status
  //                 res.status(401).json({ message: 'Authentication failed. Wrong password' });
  //             } else {
  //                 // If everything is ok, create a token with the user id
  //                 const currentDate = new Date();
  //                 currentDate.setHours(currentDate.getHours() + 7 );
  //                     // Return the JWT token with OK (200) status
  //                     return res.status(200).json({ token: jwt.sign({ email: user.email,
  //                                                         _id: user.idUser,
  //                                                         _idUserType: user.idUserType,
  //                                                         _idLevel: user.idLevel,
  //                                                         name: user.name,
  //                                                         lastName: user.lastName,
  //                                                         exp: Math.floor(currentDate / 1000)}, process.env.SECRET_KEY) });
  //             }
  //         }

  //     } catch(e){
  //         console.log('Oops something happend: ', e);
  //     }
  // });
};


export const getProductsInfo = async (req, res) => {
  var tempProductInfoArray = [
    { idProduct: 1, name: "Whisky blah" },
    { idProduct: 2, name: "Whisky blah 2" },
    { idProduct: 3, name: "Whisky blah 3" },
    { idProduct: 4, name: "Whisky blah 4" },
  ];

  res.status(200).send(tempProductInfoArray);

  // Internal function to search the user in the DB
  // var connection = await sqlPool.connect();
  // connection.request().execute('prcGetAllStoresInventory', function(err, recordset) {
  //     if (err) {
  //         console.log("Not able to stablish connection: " + err);
  //         // Return the error with BAD REQUEST (400) status
  //         res.status(400).send(err);
  //     }
  //     try{
  //         var key = Object.keys(recordset.recordset[0])[0];

  //         if (JSON.parse(recordset.recordset[0][key]).length == 0) {
  //             // Return the error with UNAUTHORIZED (401) status
  //             res.status(401).json({ message: 'Authentication failed. No user found' });
  //         } else {
  //             var user = JSON.parse(recordset.recordset[0][key])[0];
  //             console.log(user);

  //             if (!comparePassword(req.body.password, user.password)) {
  //                 // Return the error with UNAUTHORIZED (401) status
  //                 res.status(401).json({ message: 'Authentication failed. Wrong password' });
  //             } else {
  //                 // If everything is ok, create a token with the user id
  //                 const currentDate = new Date();
  //                 currentDate.setHours(currentDate.getHours() + 7 );
  //                     // Return the JWT token with OK (200) status
  //                     return res.status(200).json({ token: jwt.sign({ email: user.email,
  //                                                         _id: user.idUser,
  //                                                         _idUserType: user.idUserType,
  //                                                         _idLevel: user.idLevel,
  //                                                         name: user.name,
  //                                                         lastName: user.lastName,
  //                                                         exp: Math.floor(currentDate / 1000)}, process.env.SECRET_KEY) });
  //             }
  //         }

  //     } catch(e){
  //         console.log('Oops something happend: ', e);
  //     }
  // });
};

export const updateStoreInventory = async (req, res) => {

  console.log(req.body);

  res.status(200).send({message: "OK"});

  // // Preparing the pool connection to the DB
  // var connection = await sqlPool.connect();

  // // Encrypting the password
  // var hashPassword = bcrypt.hashSync(req.body.password, 10);

  // // Preparing the query to insert the new user
  // var request = new sql.Request(connection);
  // request.input("emailParam", sql.VarChar(50), req.body.email);
  // request.input("passwordParam", sql.VarChar, hashPassword);
  // request.input("locationLatParam", sql.Int, req.body.positionLat);
  // request.input("locationLngParam", sql.Int, req.body.positionLng);
  // request.input("nameParam", sql.VarChar, req.body.name);
  // request.input("lastnameParam", sql.VarChar, req.body.lastName);
  // request.input("telephoneParam", sql.VarChar, req.body.telephone);
  // request.input("country", sql.VarChar, req.body.country);

  // // Executing the query
  // request.execute("prcUpdateStoreInventory", function (err, recordset) {
  //   if (err) {
  //     console.log("Not able to stablish connection: " + err);
  //     // Return the error with BAD REQUEST (400) status
  //     res.status(400).send(err);
  //   }

  //   try {
  //     var key = Object.keys(recordset.recordset[0])[0];

  //     if (recordset.recordset[0][key].length == 0) {
  //       // Return the error with UNAUTHORIZED (401) status
  //       res.status(401).json({ message: "Could not create user." });
  //     } else {
  //       var result = recordset.recordset[0][key];
  //       console.log(result);

  //       // Return the result from the DB with OK (200) status
  //       return res.status(200).json(result);
  //     }
  //   } catch (e) {
  //     console.log("Oops something happend: ", e);
  //   }
  // });
};
