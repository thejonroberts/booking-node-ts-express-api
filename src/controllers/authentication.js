'use strict';

const passport = require('passport');

// loginUser = (err, user, msgObj) => {};

module.exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return next(new Error(`User must be logged in for this request`));
};

module.exports.register = (req, res, next) => {
  if (req.body.password === req.body.confirmation) {
    passport.authenticate('local-signup', (err, user, msgObj) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        // NOTE
        return next(new Error(`no user`));
      }
      req.logIn(user, err => {
        if (err) {
          return next(err);
        }
        // console.log('msgObj', msgObj);
        res.status(200).json(msgObj);
      });
    })(req, res, next);
  } else {
    return next(new Error(`Password & password confirmation do not match'`));
  }
};

module.exports.login = (req, res, next) => {
  // TODO refactor to helper with strategy arg
  passport.authenticate('local-signin', (err, user, msgObj) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // NOTE
      // return res.render('login', msgObj);
      return next(new Error(`no user`));
    }
    // TODO refactor to helper loginUser
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      // TODO - better / more user info ?
      console.log('msgObj', msgObj);
      res.status(200).json(msgObj);
    });
  })(req, res, next);
};

module.exports.logout = (req, res) => {
  req.session.destroy(function(err) {
    if (err) {
      res.status(500).json({ message: 'error logging out' });
    }
    // TODO better message?
    res.status(200).json({ message: 'logged out of current session' });
  });
};
