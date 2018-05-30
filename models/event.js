'use strict';
module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define(
    'Event',
    {
      date: DataTypes.STRING,
      startTime: DataTypes.STRING,
      endTime: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  Event.associate = models => {
		Event.belongsTo(models.Venue, {
			foreignKey: 'VenueId',
    });
	};

  return Event;
};
