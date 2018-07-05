'use strict';
// TODO: ts for this file
const bCrypt = require('bcrypt-nodejs');
const passport = require('passport');
const { Strategy } = require('passport-local');
let User = null;

// REGISTRATION
const RegistrationStrategy = new Strategy(
  {
    passReqToCallback: true,
    passwordField: 'password',
    usernameField: 'email',
  },
  // arg2 callback, handle storing a user's details.
  (req, email, password, done) => {
    User = req.app.get('models').User;

    const generateHash = entered => {
      return bCrypt.hashSync(entered, bCrypt.genSaltSync(8));
    };

    User.findOne({
      where: { email },
    }).then(user => {
      if (user) {
        return done(null, false, {
          message: 'That email is already taken',
        });
      } else {
        const userPassword = generateHash(password);
        const data = {
          email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: userPassword,
          phoneNumber: req.body.phoneNumber,
          username: req.body.username,
        };

        User.create(data).then((newUser, created) => {
          if (!newUser) {
            return done(null, false, {
              message: 'Error creating new user',
            });
          }
          if (newUser) {
            return done(null, newUser, {
              // TODO: logging?
              created,
            });
          }
        });
      }
    });
  }
);

//LOCAL SIGNIN
const LoginStrategy = new Strategy(
  {
    // TODO: change to username login
    // by default, local strategy uses username, we will override with email
    passReqToCallback: true, // pass back the entire request to the callback
    passwordField: 'password',
    usernameField: 'email',
  },
  (req, email, password, done) => {
    User = req.app.get('models').User;
    const isValidPassword = (entered, stored) => {
      return bCrypt.compareSync(stored, entered);
    };

    User.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          return done(null, false, {
            // TODO: more info ?
            message:
              'Can\'t find a user with those credentials. Please try again',
          });
        }
        if (req.body.username !== user.username) {
          return done(null, false, {
            message: 'Wrong username. Please try again',
          });
        }
        if (!isValidPassword(user.password, password)) {
          return done(null, false, {
            message: 'Incorrect password.',
          });
        }
        const userInfo = user.get();
        return done(null, userInfo);
      })
      .catch(err => {
        return done(null, false, {
          // TODO:
          // error: err,
          message: 'Something went wrong with your sign in',
        });
      });
  }
);

// Save the user id to the session in req.session.passport.user
passport.serializeUser((user, done) => {
  // TODO: need other user info persisted?
  done(null, user.id);
});

passport.deserializeUser(({ id }, done) => {
  User.findById(id).then(user => {
    if (user) {
      done(null, user.get());
    } else {
      done(user.errors, null);
    }
  });
});
/**
 * NOTE: sets strategy names used in authentication controller
 */
passport.use('local-signUp', RegistrationStrategy);
passport.use('local-signIn', LoginStrategy);
