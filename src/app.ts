import bodyParser from 'body-parser';
import express, { Application, NextFunction, Request, Response } from 'express';
import session from 'express-session';
import validator from 'express-validator';
import passport from 'passport';
import path from 'path';

import * as dotenv from 'dotenv';
const env = dotenv.config();
import './config/passport.js';

import * as models from './models';
import router from './routes/index';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.middleware();
    this.routes();
    this.errors();
  }

  private config(): void {
    this.app.set('port', process.env.PORT || 3000);
    this.app.set('host', process.env.HOST || '127.0.0.1');
    this.app.set('view engine', 'pug');
    this.app.use(express.static(path.join(__dirname, '../public')));
  }

  private middleware(): void {
    /**
     * NOTE: attaching the database / model instances to the express app here to
     * this creates a singleton-esque setup.  However, we need the request.app
     * object to access db. This leads to needing two controller setups for api
     * & admin - each nearly identical, but ending with either res.send (api)
     * or res.render (admin). Less than ideal!
     */
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
        secret: process.env.SESSION_SECRET || 'keyboard cat',
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
    // TODO: express-validator validations
    this.app.use(validator());

  }

  private routes(): void {
    this.app.use(router);
  }

  private errors(): void {
    // TODO: error handlers / logging
    // http://thecodebarbarian.com/80-20-guide-to-express-error-handling.html
    this.app.use(
      (error: Error, request: Request, res: Response, next: NextFunction): void => {
        if (error) {
          res.send({ error });
        } else {
          return next();
        }
     });
  }
}

export default new App().app;
