'use strict';

const bCrypt = require('bcrypt-nodejs');
const passport = require('passport');
// initialize the passport-local strategy
const { Strategy } = require('passport-local');
let User = null;

const RegistrationStrategy = new Strategy(
  // passport options
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  // arg2 callback, handle storing a user's details.
  (req, email, password, done) => {
    User = req.app.get('models').User;

    const generateHash = password => {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8));
    };

    // using the Sequelize user model we initialized earlier as User, we check to see if the user already exists, and if not we add them.
    User.findOne({
      where: { email },
    }).then(user => {
      if (user) {
        return done(null, false, {
          // TODO better message / info here
          message: 'That email is already taken',
        });
      } else {
        const userPassword = generateHash(password);
        const data = {
          email,
          password: userPassword,
          username: req.body.username,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber,
        };

        User.create(data).then((newUser, created) => {
          if (!newUser) {
            return done(null, false);
          }
          if (newUser) {
            console.log('newUser', newUser);
            return done(null, newUser);
          }
        });
      }
    });
  }
);

// login authentication ****************************************
//LOCAL SIGNIN
const LoginStrategy = new Strategy(
  {
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true, // allows us to pass back the entire request to the callback
  },
  (req, email, password, done) => {
    User = req.app.get('models').User;
    const isValidPassword = (userpass, password) => {
      // hashes the passed-in password and then compares it to the hashed password fetched from the db
      return bCrypt.compareSync(password, userpass);
    };

    User.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          return done(null, false, {
            // TODO more info ?
            message:
              "Can't find a user with those credentials. Please try again",
          });
        }
        if (req.body.username != user.username) {
          return done(null, false, {
            message: 'Wrong username. Please try again',
          });
        }
        if (!isValidPassword(user.password, password)) {
          return done(null, false, {
            message: 'Incorrect password.',
          });
        }
        const userinfo = user.get();
        return done(null, userinfo);
      })
      .catch(err => {
        return done(null, false, {
          error: err,
          message: 'Something went wrong with your sign in',
        });
      });
  }
);

//serialize. In this function, we will be saving the user id to the session in
// req.session.passport.user
passport.serializeUser((user, done) => {
  console.log('hello, serialize');

  // This saves the whole user obj into the session cookie,
  // but typically you will see just user.id passed in.
  done(null, user);
});

// deserialize user
// We use Sequelize's findById to get the user. Then we use the Sequelize getter
// function, user.get(), to pass a reference to the user to the 'done' function.
passport.deserializeUser(({ id }, done) => {
  User.findById(id).then(user => {
    if (user) {
      done(null, user.get());
    } else {
      done(user.errors, null);
    }
  });
});

// Take the new strategies we just created and use them as middleware, so the
// http requests get piped through them. A POST to register or login will trigger
// a strategy, because we will call passport.authenticate in the auth ctrl.
// The first argument is optional and it sets the name of the strategy.
passport.use('local-signup', RegistrationStrategy);
passport.use('local-signin', LoginStrategy);
