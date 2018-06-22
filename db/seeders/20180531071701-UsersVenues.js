'use strict';

const usersVenues = require('../data/users-venues');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UsersVenues', usersVenues, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UsersVenues', null, {});
  },
};
