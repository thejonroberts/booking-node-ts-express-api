if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config();
}
const env = process.env.NODE_ENV || 'production';
const port = process.env.DB_PORT || 5432;
const dialect = process.env.DIALECT || 'postgres';
const database = process.env.DB_NAME || 'booking';
const user = process.env.DB_USER || 'postgres';
const password = process.env.DB_PASS || 'postgres';
const host = process.env.DB_HOST || 'localhost';

let url;

switch (env) {
  case 'production':
    url = process.env.DATABASE_URL; // stored in heroku config vars
    break;
  case 'testing':
  case 'test_travis':
  case 'development':
    url = `postgres://${user}:${password}@${host}:${port}/${database}`;
    break;
  default:
    url = 'postgres://postgres:postgres@localhost:5432/booking';
}

// NOTE: sequelize cli environment config for migrations, etc...
// TODO: could probably just set all to {url} after above, need to test.
module.exports = {
  development: {
    database,
    dialect,
    host,
    port,
  },
  production: {
    url,
  },
  test_travis: {
    database,
    dialect,
    host,
    port,
  },
  testing: {
    database,
    dialect,
    host,
    port,
  },
  // NOTE: this is what is used by the app (src/model/index)
  url,
};
