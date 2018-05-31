'use strict';

const eventBands = require('../data/eventBands');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EventsBands', eventBands, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EventsBands', null, {});
  },
};
