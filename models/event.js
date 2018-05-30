'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {});
  Event.associate = function(models) {
    Event.belongsTo(models.Venue, {
			foreignKey: 'VenueId',
    });
  };
  return Event;
};
