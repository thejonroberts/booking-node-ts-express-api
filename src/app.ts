import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import validator from 'express-validator';
import passport from 'passport';

import { NextFunction, Request, Response } from 'express';

import * as dotenv from 'dotenv';
const env = dotenv.config();
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
    this.app.use(
      (req: Request, res: Response, next: NextFunction): void => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
          'Access-Control-Allow-Methods',
          'PUT, GET, POST, DELETE, OPTIONS'
        );
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept, Authorization, ' +
            'Access-Control-Allow-Credentials'
        );
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
      }
    );
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
    this.app.use(
      (req: Request, res: Response, next: NextFunction): void => {
        res.locals.session = req.session;
        next();
      }
    );
    // TODO express-validator
    this.app.use(validator());

    // TODO: format of move this error handler
    this.app.use(
      (
        error: any,
        request: Request,
        res: Response,
        next: NextFunction
      ): void => {
        if (error) {
          res.status(500).json({ error, request });
        } else {
          next();
        }
      }
    );
  }

  private routes(): void {
    this.app.use(router);
  }
}

export default new App().app;

// TODO: more middleware:
// const logger = require('debug')('logger');

// static assets
// app.use('/public', express.static(__dirname + '/static'));

// DOCS - TODO - swagger-ui & swagger-jsonDoc
// swaggerUi  require('swagger-ui-express');
// const swaggerDocument = require('./config/swagger.json');
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/api/v1', router);

// TODO error handlers
// http://thecodebarbarian.com/80-20-guide-to-express-error-handling.html
