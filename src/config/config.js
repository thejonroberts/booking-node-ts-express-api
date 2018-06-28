const dotenv = require('dotenv');
dotenv.config();
const env = process.env.NODE_ENV || 'production';
const port = process.env.DB_PORT || 5433;
const dbName = process.env.DB_NAME || 'booking';
const user = process.env.DB_USER || 'postgres';
const pass = process.env.DB_PASS || 'postgres';
const host = process.env.DB_HOST || 'localhost';

let url;
switch (env) {
  case 'production':
    url = process.env.DATABASE_URL;
    break;
  case 'testing':
  case 'development':
    url = `postgres://${user}@${host}:${port}/${dbName}`;
    break;
  default:
    url = 'postgres://postgres:postgres@localhost:5432/booking';
}

// compatibility with sequelize cli for migrations, etc...
module.exports = {
  development: {
    database: 'booking',
    dialect: 'postgres',
    host: '127.0.0.1',
  },
  production: {
    use_env_variable: process.env.DATABASE_URL,
  },
  test: {
    database: 'booking_test',
    dialect: 'postgres',
    host: '127.0.0.1',
    port: process.env.TEST_DB_PORT || 5432,
  },
  testing: {
    database: 'travis_ci_test',
    dialect: 'postgres',
    host: '127.0.0.1',
    password: process.env.DB_PASS || null,
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER || 'postgres',
  },
  url,
};
