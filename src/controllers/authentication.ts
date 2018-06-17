import { NextFunction, Request, Response } from 'express';

import passport from 'passport';

export function isLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.isAuthenticated()) {
    return next();
  }
  return next(new Error(`User must be logged in for this request`));
}

export function register(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.body.password === req.body.confirmation) {
    passport.authenticate('local-signup', (err, user, msgObj) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(new Error(`no user`));
      }
      req.logIn(user, userError => {
        if (userError) {
          return next(userError);
        }
        res.status(200).json(msgObj);
      });
    })(req, res, next);
  } else {
    return next(new Error(`Password & password confirmation do not match'`));
  }
}

export function login(req: Request, res: Response, next: NextFunction): void {
  // TODO refactor to helper with strategy arg
  passport.authenticate('local-signin', (err, user, msgObj) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new Error(`no user`));
    }
    // TODO: refactor to helper loginUser
    req.logIn(user, userError => {
      if (userError) {
        return next(userError);
      }
      res.status(200).json(msgObj);
    });
  })(req, res, next);
}

export function logout(req: Request, res: Response, next: NextFunction): void {
  req.session.destroy(err => {
    if (err) {
      res.status(500).json({ message: 'error logging out' });
    }
    // TODO better message?
    res.status(200).json({ message: 'logged out of current session' });
  });
}
