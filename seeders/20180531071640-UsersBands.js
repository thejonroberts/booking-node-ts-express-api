'use strict';

const usersBands = require('../data/usersBands');

module.exports = {
  /* eslint-disable no-unused-vars */
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UsersBands', usersBands, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UsersBands', null, {});
  },
  /* eslint-enable no-unused-vars */
};
