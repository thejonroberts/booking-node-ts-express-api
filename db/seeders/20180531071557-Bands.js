'use strict';

const bands = require('../data/bands');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bands', bands, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Bands', null, {});
  },
};
