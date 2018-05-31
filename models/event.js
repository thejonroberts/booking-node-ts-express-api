'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define(
    'Event',
    {
      startsAt: DataTypes.DATE,
      endsAt: DataTypes.DATE,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      VenueId: DataTypes.INTEGER,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  Event.associate = function(models) {
    Event.belongsTo(models.Venue, {
      foreignKey: 'VenueId',
    });
  };
  return Event;
};
