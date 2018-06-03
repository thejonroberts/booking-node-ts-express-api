'use strict';

const addresses = require('../data/addresses');

module.exports = {
  /* eslint-disable no-unused-vars */
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Addresses', addresses, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Addresses', null, {});
  },
  /* eslint-enable no-unused-vars */
};
