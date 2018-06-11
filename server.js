'use strict';

require('dotenv').config();
const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';

const express = require('express');
const app = express();
// const logger = require('debug')('logger');

// Attach models
app.set('models', require('./models'));

// TODO HTTP Headers
// Enable CORS from client-side - TODO check best practices / security
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// MIDDLEWARE

//static assets
// app.use('/public', express.static(__dirname + '/static'));

// SESSION / AUTH
let session = require('express-session');
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'keyboard cat', // TODO
    resave: true,
    saveUninitialized: true,
  })
);
const passport = require('passport');
require('./config/passport.js');
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO express-validator
const expressValidator = require('express-validator');
app.use(expressValidator());

// ROUTES
const router = require('./routes/');
app.use(router);

// DOCS - TODO - swagger-ui & swaager-jsonDoc
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./config/swagger.json');
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/api/v1', router);

// TODO error handlers
// Add error handler to pipe all server errors to from the routing middleware
// NOTE res.status(500).send({error: 'Internal server error happened'})
// 2xx, if everything was okay,
// 3xx, if the resource was moved,
// 5xx, if something went wrong on the API side (like an exception happened).

// http://thecodebarbarian.com/80-20-guide-to-express-error-handling.html
// const { MongoError } = require('mongodb');

// app.use(function handleDatabaseError(error, req, res, next) {
//   if (error instanceof MongoError) {
//     return res.status(503).json({
//       type: 'MongoError',
//       message: error.message,
//     });
//   }
//   next(error);
// });

// 4xx, if the request cannot be fulfilled because of a client error (like requesting a resource that does not exist),
// 404
app.get('*', function(req, res, next) {
  // request at bad route
  setImmediate(() => {
    res.status(404);
    next(new Error(`${req.path} does not exist`));
  });
});

app.use(function(error, req, res, next) {
  if (error) {
    res.json(error);
  } else {
    next();
  }
});

// if we are not running this from test/setup.js / dev-test script!
if (!module.parent) {
  app.listen(port, () => {
    if (process.env.NODE_ENV === 'development') {
      /* eslint-disable-next-line */
      console.log(`${process.env.NODE_ENV} mode on http://${host}:${port}`);
    }
  });
}

module.exports = app;
