module.exports = {
  development: {
    database: 'booking',
    dialect: 'postgres',
    host: '127.0.0.1',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  },
  test: {
    database: 'travis_ci_test',
    dialect: 'postgres',
    host: '127.0.0.1',
    password: process.env.CI_DB_PASSWORD || null,
    port: process.env.CI_DB_PORT || 5432,
    username: process.env.CI_DB_USERNAME || 'postgres',
  },
  testing: {
    database: 'booking',
    dialect: 'postgres',
    host: '127.0.0.1',
    port: process.env.TEST_DB_PORT || 5432,
  },
};
