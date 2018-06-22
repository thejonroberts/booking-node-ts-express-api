'use strict';

const eventBands = require('../data/event-bands');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EventsBands', eventBands, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EventsBands', null, {});
  },
};
