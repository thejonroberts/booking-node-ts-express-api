'use strict';
// adapted from NSS group project: https://github.com/Delicate-Butterflies/Bangazon-Site
const express = require('express');
const app = express();
let bodyParser = require('body-parser');

require('dotenv').config();
const port = process.env.PORT || 8080;

// using require('./models') to get the models may create more than one connection to the database.
// To avoid that, the models variable must be somehow singleton-esque.
// This can be achieved by attaching the models module to the application:
app.set('models', require('./models'));
// And when you need to require a class of the model in a controller,
// use this insise a middleware function rather than a direct import:
// const { Computer } = req.app.get('models');

// static assets
// app.use('/public', express.static(__dirname + '/static'));

let routes = require('./routes/');

// MIDDLEWARE
// TODO method-override
// app.use(
//   // eslint-disable-next-line
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

// TODO Add a 404 error handler
// Add error handler to pipe all server errors to from the routing middleware

app.listen(port, () => {
	/* eslint-disable */
	console.log(`listening on port ${port}`);
	/* eslint-enable */
});
