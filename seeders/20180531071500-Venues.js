'use strict';

const venues = require('../data/venues');

module.exports = {
  /* eslint-disable no-unused-vars */
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Venues', venues, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Venues', null, {});
  },
  /* eslint-enable no-unused-vars */
};
