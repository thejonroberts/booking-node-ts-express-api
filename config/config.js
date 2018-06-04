module.exports = {
  development: {
    database: 'booking',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: process.env.CI_DB_USERNAME || 'postgres',
    password: process.env.CI_DB_PASSWORD || null,
    database: 'travis_ci_test',
    host: '127.0.0.1',
    port: process.env.CI_DB_PORT || 5432,
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
