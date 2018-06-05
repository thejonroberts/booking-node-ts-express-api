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
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  },
};
