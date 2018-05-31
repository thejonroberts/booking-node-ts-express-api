'use strict';

const usersBands = require('../data/usersBands');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UsersBands', usersBands, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UsersBands', null, {});
  },
};
