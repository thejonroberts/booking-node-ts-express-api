'use strict';

const bands = require('../data/bands');

module.exports = {
  /* eslint-disable no-unused-vars */
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bands', bands, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Bands', null, {});
  },
  /* eslint-enable no-unused-vars */
};
