'use strict';
// adapted from NSS group project: https://github.com/Delicate-Butterflies/Bangazon-Site
const express = require('express');
const app = express();
let bodyParser = require('body-parser');

require('dotenv').config();
const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';

// Attach the models module to the express application:
app.set('models', require('./models'));

let routes = require('./routes/');

// MIDDLEWARE
// TODO method-override
// app.use(
// 	methodOverride(function(req, res) {
// 		if (req.body && typeof req.body === 'object' && '_method' in req.body) {
// 			let method = req.body._method;
// 			return method;
// 		}
// 	})
// );

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO express-validator
// validation - must be after bodyParser as it uses bodyParser to access parameters
// app.use(expressValidator());

// ROUTES
app.use(routes);

// TODO 404 error handler
// Add error handler to pipe all server errors to from the routing middleware
// NOTE res.status(500).send({error: 'Internal server error happened'})
// 2xx, if everything was okay,
// 3xx, if the resource was moved,
// 4xx, if the request cannot be fulfilled because of a client error (like requesting a resource that does not exist),
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

// TODO HTTP Headers

app.get('*', function(req, res, next) {
  // request at bad route
  setImmediate(() => {
    res.status(404);
    next(new Error(`${req.path} does not exist`));
  });
});

app.use(function(error, req, res, next) {
  if (error) {
    res.json({ message: error.message });
  } else {
    next();
  }
});

// if we are not running this from dev-test script!
if (!module.parent) {
  app.listen(port, () => {
    if (process.env.NODE_ENV === 'development') {
      /* eslint-disable-next-line */
      console.log(
        `ENV: ${process.env.NODE_ENV} is listening on http://${host}:${port}`
      );
    }
  });
}

module.exports = app;
