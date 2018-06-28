const dotenv = require('dotenv');
dotenv.config();
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
    url = process.env.DATABASE_URL + ''; // NOTE: coerce to string for heroku
    break;
  case 'testing':
  case 'test_travis':
  case 'development':
    url = `postgres://${user}:${password}@${host}:${port}/${database}`;
    break;
  default:
    url = 'postgres://postgres:postgres@localhost:5432/booking';
}

// NOTE: compatibility with sequelize cli for migrations, etc...
module.exports = {
  development: {
    database,
    dialect,
    host,
    port,
  },
  production: {
    // NOTE: basically so that I can use just one env variable with heroku,
    use_env_variable: process.env.DATABASE_URL,
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
