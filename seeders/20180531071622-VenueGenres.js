'use strict';

const venueGenres = require('../data/venue-genres');

module.exports = {
  /* eslint-disable no-unused-vars */
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('VenuesGenres', venueGenres, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('VenuesGenres', null, {});
  },
  /* eslint-enable no-unused-vars */
};
