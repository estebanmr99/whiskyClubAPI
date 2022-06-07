import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pg from 'pg';
import sql from 'mssql';

const sqlConfig = {
    server: process.env.SQL_SERVER,
    authentication: {
      type: 'default',
      options: {  
        userName: process.env.SQL_DATABASE_USER,
        password: process.env.SQL_DATABASE_PASSWORD,
      }
    },
    database: process.env.SQL_DATABASE,
    options: {
        trustServerCertificate: true,
        encrypt: false,
    }
};

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
const sqlPool = new sql.ConnectionPool(sqlConfig);

// Function to verify if the user has logged in
export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: "Unauthorized user!" });
    }
}

// Function to register a new user
// Will recieve in the body:
//                            the email address
//                            the user password
//                            the user location
//                            the user name
//                            the user phone number
//                            the user last name
export const register = async(req, res) => {
    // Preparing the pool connection to the DB
    var connection = await sqlPool.connect();

    // Encrypting the password
    var hashPassword = bcrypt.hashSync(req.body.password, 10);

    // Preparing the query to insert the new user
    var request = new sql.Request(connection);
    request.input('emailParam', sql.VarChar(50), req.body.email);
    request.input('passwordParam', sql.VarChar, hashPassword);
    request.input('locationLatParam', sql.Int, req.body.positionLat);
    request.input('locationLngParam', sql.Int, req.body.positionLng);
    request.input('nameParam', sql.VarChar, req.body.name);
    request.input('lastnameParam', sql.VarChar, req.body.lastName);
    request.input('telephoneParam', sql.VarChar, req.body.telephone);
    request.input('country', sql.VarChar, req.body.country);

    // Executing the query
    request.execute('prcRegisterUser', function(err, recordset) {
        if (err) {
            console.log("Not able to stablish connection: " + err);
            // Return the error with BAD REQUEST (400) status
            res.status(400).send(err);
        }

        try{
            var key = Object.keys(recordset.recordset[0])[0];

            if (recordset.recordset[0][key].length == 0) {
                // Return the error with UNAUTHORIZED (401) status
                res.status(401).json({ message: 'Could not create user.' });
            } else {
                var result = recordset.recordset[0][key];
                console.log(result);

                // Return the result from the DB with OK (200) status
                return res.status(200).json(result);
            }
            
        } catch(e){
            console.log('Oops something happend: ', e);
        }
    });
}

// Function to login an existing user
// Will recieve in the body:
//                            the username
//                            the user password

export const login = async(req, res) => {

    var email = req.body.email;
    await findUserByEmail(email);

    // Internal function to search the user in the DB

    async function findUserByEmail(email) {
        var connection = await sqlPool.connect();
        connection.request().input('emailParam', sql.VarChar(50), email).execute('prcFindUserByEmail', function(err, recordset) {
            if (err) {
                console.log("Not able to stablish connection: " + err);
                // Return the error with BAD REQUEST (400) status
                res.status(400).send(err);
            }
            try{
                var key = Object.keys(recordset.recordset[0])[0];
    
                if (JSON.parse(recordset.recordset[0][key]).length == 0) {
                    // Return the error with UNAUTHORIZED (401) status
                    res.status(401).json({ message: 'Authentication failed. No user found' });
                } else {
                    var user = JSON.parse(recordset.recordset[0][key])[0];
                    console.log(user);
    
                    if (!comparePassword(req.body.password, user.password)) {
                        // Return the error with UNAUTHORIZED (401) status
                        res.status(401).json({ message: 'Authentication failed. Wrong password' });
                    } else {
                        // If everything is ok, create a token with the user id
                        const currentDate = new Date();
                        currentDate.setHours(currentDate.getHours() + 7 );
                            // Return the JWT token with OK (200) status
                            return res.status(200).json({ token: jwt.sign({ email: user.email, 
                                                                _id: user.idUser,
                                                                _idUserType: user.idUserType,
                                                                _idLevel: user.idLevel,
                                                                name: user.name,
                                                                lastName: user.lastName,
                                                                exp: Math.floor(currentDate / 1000)}, process.env.SECRET_KEY) });
                    }
                }
                
            } catch(e){
                console.log('Oops something happend: ', e);
            }
        });
    }

    // Internal function to compare the provided hash password with the hash password from the DB
    function comparePassword(password, hashPassword) {
        return bcrypt.compareSync(password, hashPassword);
    }
}