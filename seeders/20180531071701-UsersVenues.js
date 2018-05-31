'use strict';

const usersVenues = require('../data/usersVenues');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UsersVenues', usersVenues, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UsersVenues', null, {});
  },
};
