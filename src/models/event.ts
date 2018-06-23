import { DataTypes, Model, Sequelize } from 'sequelize';

module.exports = (sequelize: Sequelize, dataTypes: DataTypes)  => {
  const Event = sequelize.define(
    'Event',
    {
      VenueId: dataTypes.INTEGER,
      description: dataTypes.STRING,
      endsAt: dataTypes.DATE,
      startsAt: dataTypes.DATE,
      title: dataTypes.STRING,
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
  Event.associate = models => {
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
