'use strict';
module.exports = (sequelize, DataTypes) => {
  let Event = sequelize.define(
    'Event',
    {
      VenueId: DataTypes.INTEGER,
      description: DataTypes.STRING,
      endsAt: DataTypes.DATE,
      startsAt: DataTypes.DATE,
      title: DataTypes.STRING,
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
  Event.associate = function(models) {
    Event.belongsTo(models.Venue, {
      foreignKey: 'VenueId',
    });

    Event.belongsToMany(models.Band, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      through: 'EventsBands',
    });
  };

  return Event;
};
