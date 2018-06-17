import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import validator from 'express-validator';
import passport from 'passport';

import * as dotenv from 'dotenv';
dotenv.config();

import './config/passport.js';
import * as models from './models';
import router from './routes/';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.set('port', process.env.PORT || 3000);
    this.app.set('host', process.env.HOST || '127.0.0.1');
    this.app.set('models', models);
    // HTTP Headers
    // Enable CORS from client-side - TODO check best practices / security
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'PUT, GET, POST, DELETE, OPTIONS'
      );
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials'
      );
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
    // body-parser
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    // SESSION / AUTH
    this.app.use(
      session({
        resave: true,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET || 'keyboard cat' // TODO
      })
    );

    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use((req, res, next) => {
      res.locals.session = req.session;
      next();
    });
    // TODO express-validator
    this.app.use(validator());

    this.app.use((error, request, res, next) => {
      if (error) {
        res.status(500).json({ request, error });
      } else {
        next();
      }
    });
  }

  private routes(): void {
    this.app.use(router);
  }
}

export default new App().app;

// TODO: more middlewares:
// const logger = require('debug')('logger');

// static assets
// app.use('/public', express.static(__dirname + '/static'));

// DOCS - TODO - swagger-ui & swaager-jsonDoc
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./config/swagger.json');
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/api/v1', router);

// TODO error handlers
// http://thecodebarbarian.com/80-20-guide-to-express-error-handling.html
