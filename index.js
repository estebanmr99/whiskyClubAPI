import 'dotenv/config.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import jsonwebtoken from 'jsonwebtoken'; 
import routes from './src/routes/apiRoute.js';

const app = express();

app.use(cors());

//Body parser library to handle request content
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true }));

// JWT validation in case token was sent in the request
app.use((req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      // Verify if the token was sent
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY, (err, decode) => {
          if (err) req.user = undefined;
          req.user = decode;
          next();
      });
  } else {
      req.user = undefined;
      next();
  }
});

// Route mapping
routes(app);

//App server initialize 
app.listen(process.env.PORT, () =>
  console.log(`App listening on port ${process.env.PORT}!`),
);