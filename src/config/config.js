module.exports = {
  development : {
    dialect : 'postgres',
    operatorsAliases : false,
    url : 'postgres://postgres:postgres@localhost:5432/booking',
  },
  production : {
    dialect : 'postgres',
    operatorsAliases : false,
  },
  test : {
    dialect : 'postgres',
    operatorsAliases : false,
    url : 'postgres://postgres:postgres@localhost:5432/travis_ci_test',
  },
  testing: {
    database: 'booking',
    dialect: 'postgres',
    host: '127.0.0.1',
    port: process.env.TEST_DB_PORT || 5432,
    url : 'postgres://postgres:postgres@localhost:5432/booking',
  },
};
