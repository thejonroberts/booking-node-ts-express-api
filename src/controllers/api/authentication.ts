import { NextFunction, Request, Response } from 'express';

import passport from 'passport';

// TODO: Tests!

export function isLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.isAuthenticated()) {
    return next();
  }
  return next(new Error(`User must be logged in for this request.`));
}

export function register(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.body.password === req.body.confirmation) {
    passport.authenticate('local-signUp', (err, user, msgObj) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(new Error(`No user.`));
      }
    // tslint:disable no-identical-functions
      req.logIn(user, userError => {
        if (userError) {
          return next(userError);
        }
        res.status(200).json(msgObj);
      });
    // tslint:enable no-identical-functions
    })(req, res, next);
  } else {
    return next(new Error(`Password & password confirmation do not match'`));
  }
}

export function login(req: Request, res: Response, next: NextFunction): void {
  // TODO: refactor to helper with strategy arg
  passport.authenticate('local-signIn', (err, user, msgObj) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new Error(`no user`));
    }
    // TODO: refactor to helper loginUser
    // tslint:disable no-identical-functions
    req.logIn(user, userError => {
      if (userError) {
        return next(userError);
      }
      res.status(200).json(msgObj);
    });
    // tslint:enable no-identical-functions
  })(req, res, next);
}

export function logout(req: Request, res: Response, next: NextFunction): void {
  req.session.destroy(err => {
    if (err) {
      res.status(500).json({ message: 'Error logging out!' });
    }
    // TODO: better message?
    res.status(200).json({ message: 'Logged out of current session.' });
  });
}
