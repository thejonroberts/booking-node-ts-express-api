'use strict';

const shows = require('../data/shows');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Shows', shows, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Shows', null, {});
  },
};
