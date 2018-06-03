'use strict';

const usersVenues = require('../data/users-venues');

module.exports = {
  /* eslint-disable no-unused-vars */
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UsersVenues', usersVenues, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UsersVenues', null, {});
  },
  /* eslint-enable no-unused-vars */
};
