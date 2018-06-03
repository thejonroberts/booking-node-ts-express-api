'use strict';

const eventBands = require('../data/eventBands');

module.exports = {
  /* eslint-disable no-unused-vars */
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EventsBands', eventBands, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EventsBands', null, {});
  },
  /* eslint-enable no-unused-vars */
};
