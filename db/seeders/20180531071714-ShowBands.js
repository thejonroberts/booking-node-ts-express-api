'use strict';

const showBands = require('../data/show-bands');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ShowsBands', showBands, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ShowsBands', null, {});
  },
};
