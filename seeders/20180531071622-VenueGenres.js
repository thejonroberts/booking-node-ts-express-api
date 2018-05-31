'use strict';

const venueGenres = require('../data/venueGenres');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('VenuesGenres', venueGenres, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('VenuesGenres', null, {});
  },
};
