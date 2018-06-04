module.exports = {
  development: {
    database: 'booking',
    host: '127.0.0.1',
    port: process.env.DB_PORT,
    secret_key: process.env.SECRET_KEY,
    dialect: 'postgres',
  },
  // test: {
  //   database: 'booking_test',
  //   host: '127.0.0.1',
  //   port: 5432,
  //   secret_key: process.env.SECRET_KEY,
  //   dialect: 'postgres',
  // },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: 'travis_ci_test',
    host: '127.0.0.1',
    port: process.env.DB_PORT,
    dialect: 'postgres',
    // secret_key: process.env.SECRET_KEY,
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    dialect: 'postgres',
  },
};
