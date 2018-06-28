import * as dotenv from 'dotenv';
dotenv.config();
const env = process.env.NODE_ENV;
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

module.exports = {
    url,
};
